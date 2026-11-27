using APPLICATION.Services;
using CORE.Interfaces;

namespace API.Extensions;

public static class DiExtensions
{
    public static void RegisterDependencies(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IRoleModelService, RoleModelService>();
        services.AddScoped<IUserService, UserService>();
    }
}