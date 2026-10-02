using System.Text;
using CORE.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class ApiExtensions
{
    public static void AddApiAuthentication(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));
        var jwtOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

                options.DefaultSignInScheme = "Cookies";
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions!.SecretKey)),
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["DCSRT"];
                        return Task.CompletedTask;
                    }
                };
            });
        /*
        .AddCookie("Cookies")
        .AddOAuth("GitLab", options =>
        {
            options.ClientId = "";
            options.ClientSecret = "";

            options.AuthorizationEndpoint = "https://gitlab.com/oauth/authorize";
            options.TokenEndpoint = "https://gitlab.com/oauth/token";
            options.UserInformationEndpoint = "https://gitlab.com/api/v4/user";
            options.CallbackPath = "/signin-gitlab";
            options.SaveTokens = true;

            options.Scope.Add("read_user");
            options.Scope.Add("read_api");
            options.Scope.Add("read_repository");

            options.Events.OnCreatingTicket = context =>
            {
                var accessToken = context.AccessToken;
                var refreshToken = context.RefreshToken;

                return Task.CompletedTask;
            };

        });
        */
    }
}