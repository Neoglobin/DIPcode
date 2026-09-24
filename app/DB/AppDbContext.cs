using CORE.Entities;
using Microsoft.EntityFrameworkCore;

namespace DB;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> User { get; set; }
    
    public DbSet<Department> Department { get; set; }
    
    public DbSet<Project> Project { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}