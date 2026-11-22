namespace CORE.Entities;

public class UserRole : BaseEntity
{
    public List<User> User { get; set; } = [];
}