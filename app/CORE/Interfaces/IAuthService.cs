using CORE.Entities;

namespace CORE.Interfaces;

public interface IAuthService
{
    public Task<User> Register(string name, string email, string password);

    public Task<string> Login(string email, string password);
    
    public Task GitLabLogin();
}