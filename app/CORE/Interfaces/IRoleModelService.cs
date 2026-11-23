using CORE.Entities;

namespace CORE.Interfaces;

public interface IRoleModelService
{
    public Task AddUserRole(User user, Guid roleId);
    public Task<bool> CheckUserRoleEntry(Guid userId, Guid roleId);
}