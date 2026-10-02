using APPLICATION.Services;
using CORE.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using LoginRequest = API.Requests.LoginRequest;
using RegisterRequest = API.Requests.RegisterRequest;

namespace API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("register")]
    public async Task<IResult> Register(RegisterRequest request)
    {
        try
        {
            bool result = await _authService.Register(request.Name, request.Email, request.Password);

            if (!result)
            {
                return Results.BadRequest("Operation was not completed");
            }
            
            return Results.Ok();
        }
        catch (Exception ex)
        {
            return Results.BadRequest(ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IResult> Login(LoginRequest request)
    {
        try
        {
            string jwt = await _authService.Login(request.Email, request.Password);
            
            if (string.IsNullOrEmpty(jwt))
            {
                return Results.BadRequest($"Operation was not completed. Jwt token is empty");
            }

            HttpContext.Response.Cookies.Append("DCSRT", jwt);
            return Results.Ok();
        }
        catch (Exception ex)
        {
            return Results.BadRequest(ex.Message);
        }
    }
    
    
    [HttpGet("gitlab-login")]
    public async Task<IActionResult> GitLabLogin()
    {
        return Challenge(
            new AuthenticationProperties
            {
                RedirectUri = "/api/auth/success"
            },
            "GitLab");
    }

    [Authorize]
    [HttpGet("success")]
    public async Task<IResult> Success()
    {
        return Results.Ok("Success");
    }
}