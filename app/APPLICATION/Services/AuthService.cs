using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using APPLICATION.Validation;
using APPLICATION.Validation.AuthValidation;
using CORE.Entities;
using CORE.Interfaces;
using CORE.Options;
using DB;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ValidationFailure = FluentValidation.Results.ValidationFailure;

namespace APPLICATION.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _dbContext;
    private readonly JwtOptions _jwtOptions;

    public AuthService(IOptions<JwtOptions> jwtOptions, AppDbContext dbContext)
    {
        _jwtOptions = jwtOptions.Value;
        _dbContext = dbContext;
    }

    #region Methods: Public

    /// <summary>
    /// Base register method
    /// </summary>
    /// <param name="name"> User name </param>
    /// <param name="email"> User email </param>
    /// <param name="password"> User password </param>
    /// <returns> Operation code </returns>
    public async Task<bool> Register(string name, string email, string password)
    {
        if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            throw new ArgumentNullException();
        }

        if (await CheckIfUserExists(email))
        {
            throw new Exception($"User with the same email already exists: {email}");
        }

        var emailValidator = new EmailValidator();
        var passwordValidator = new PasswordValidator();
        var validationErrors = new List<ValidationFailure>();

        validationErrors.AddRange(emailValidator.Validate(email).Errors);
        validationErrors.AddRange(passwordValidator.Validate(password).Errors);

        if (validationErrors.Count > 0)
        {
            string message = "Credentials are invalid:";
            validationErrors.ForEach(x => message += $" {x.ErrorMessage};");

            throw new Exception(message);
        }

        var newUser = new User();

        newUser.Name = name;
        newUser.Email = email;
        newUser.PasswordHash = HashPassword(password);
        newUser.IsActive = true;

        await _dbContext.AddAsync(newUser);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    /// <summary>
    /// Base login method
    /// </summary>
    /// <param name="email"></param>
    /// <param name="password"></param>
    /// <returns></returns>
    public async Task<string> Login(string email, string password)
    {
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            throw new ArgumentNullException();
        }

        var user = await _dbContext.User.Where(x => x.Email == email).FirstOrDefaultAsync();

        if (user == null)
        {
            throw new Exception($"Cannot find user to login");
        }

        if (!VerifyPassword(password, user.PasswordHash))
        {
            throw new Exception("Password does not match");
        }

        return GenerateJwt(user);
    }

    public async Task GitLabLogin()
    {
        throw new NotImplementedException();
    }
    
    #endregion

    #region Methods: Private

    /// <summary>
    /// Finds existed user by email
    /// </summary>
    /// <param name="email"> UserEmail </param>
    private async Task<bool> CheckIfUserExists(string email)
    {
        return await _dbContext.User.Where(x => x.Email == email).FirstOrDefaultAsync() != null;
    }

    /// <summary>
    /// Hashes user password
    /// </summary>
    /// <returns> SHA-384 hashed password </returns>
    public static string HashPassword(string password) =>
        BCrypt.Net.BCrypt.EnhancedHashPassword(password);

    /// <summary>
    /// Verifies user password
    /// </summary>
    public static bool VerifyPassword(string password, string passwordHash) =>
        BCrypt.Net.BCrypt.EnhancedVerify(password, passwordHash);

    /// <summary>
    /// Generates JWT-token for user's session
    /// </summary>
    /// <param name="user"> Object of user </param>
    /// <returns> JWT token signed by HmacSha256 sign </returns>
    private string GenerateJwt(User user)
    {
        var expireDate = DateTime.UtcNow.AddHours(_jwtOptions.ExpireHours);
            
        Claim[] claims =
        [
            new ("UserId", user.Id.ToString()),
            new ("UserEmail", user.Email),
        ];

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey)),
                SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: signingCredentials,
            expires: expireDate);

        var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
        return tokenValue;
    }
    
    #endregion
    
}