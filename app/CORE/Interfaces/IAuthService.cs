namespace CORE.Interfaces;

public interface IAuthService
{
    public Task<bool> Register(string name, string email, string password);

    public Task<string> Login(string email, string password);
    
    public Task GitLabLogin();
}