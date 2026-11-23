using System.Security.Claims;
using CORE.Interfaces;

namespace APPLICATION.Services;

public class UserService : IUserService
{
    public Guid GetCurrentUserIdFromClaims(IEnumerable<Claim> claims)
    {
        return Guid.Parse(claims.FirstOrDefault(x => x.Type == "UserId")?.Value);
    }
}