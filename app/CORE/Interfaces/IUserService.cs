using System.Security.Claims;

namespace CORE.Interfaces;

public interface IUserService
{
    public Guid GetCurrentUserIdFromClaims(IEnumerable<Claim> claims);
}