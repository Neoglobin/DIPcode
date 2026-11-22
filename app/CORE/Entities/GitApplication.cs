namespace CORE.Entities;

public class GitApplication : BaseEntity
{
    public string ApplicationId { get; set; } = string.Empty;

    public string Secret { get; set; } = string.Empty;

    public List<User> User { get; set; } = [];
}