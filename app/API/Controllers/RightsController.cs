using API.Responses;
using CORE.Entities;
using CORE.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/rights")]
public class RightsController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IRoleModelService _roleModelService;

    public RightsController(IUserService userService, IRoleModelService roleModelService)
    {
        _userService = userService;
        _roleModelService = roleModelService;
    }
    
    [Authorize]
    [HttpGet("checkRoleEntry")]
    public async Task<BaseResponse> CheckUserRoleEntry(Guid roleId)
    {
        try
        {
            var userId = _userService.GetCurrentUserIdFromClaims(HttpContext.User.Claims);

            if (userId == Guid.Empty)
                return BaseResponse.Error("Role Id is empty");

            return BaseResponse<bool>.Success(await _roleModelService.CheckUserRoleEntry(userId, roleId));
        }
        catch (Exception ex)
        {
            return BaseResponse.Error(ex.Message);
        }
    }
}