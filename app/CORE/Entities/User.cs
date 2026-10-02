namespace CORE.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public bool IsActive { get; set; } = false;

    public List<Project> Project { get; set; } = [];
}