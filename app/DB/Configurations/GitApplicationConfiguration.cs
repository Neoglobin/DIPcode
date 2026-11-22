using CORE.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DB.Configurations;

public class GitApplicationConfiguration : IEntityTypeConfiguration<GitApplication>
{
    public void Configure(EntityTypeBuilder<GitApplication> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasMany(x => x.User)
            .WithMany(x => x.GitApplication)
            .UsingEntity("UserInGitApplication");
    }
}