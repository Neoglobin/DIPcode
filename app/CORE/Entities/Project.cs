namespace CORE.Entities;

public class Project : BaseEntity
{
    public string Description { get; set; } = string.Empty;

    public List<User> User { get; set; } = [];
}