using CORE.Entities;
using CORE.Interfaces;
using DB;
using Microsoft.EntityFrameworkCore;

namespace APPLICATION.Services;

public class RoleModelService : IRoleModelService
{
    private readonly AppDbContext _dbContext;

    public RoleModelService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task AddUserRole(User user, Guid roleId)
    {
        if (user.Id == Guid.Empty || roleId == Guid.Empty) return;

        var userRole = await _dbContext.UserRole.Where(x => x.Id == roleId).FirstOrDefaultAsync();
        if (userRole == null) return;

        user.UserRole.Add(userRole);
        
        await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> CheckUserRoleEntry(Guid userId, Guid roleId)
    {
        if (userId == Guid.Empty || roleId == Guid.Empty)
            throw new Exception("Role Id is empty");

        var roles = await _dbContext.User.Where(x => x.Id == userId)
            .Select(x => x.UserRole)
            .FirstOrDefaultAsync();

        return roles.Where(x => x.Id == roleId).FirstOrDefault() != null;
    }
}