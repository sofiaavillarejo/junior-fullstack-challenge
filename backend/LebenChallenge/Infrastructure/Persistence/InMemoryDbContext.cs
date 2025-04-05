using LebenChallenge.Domain;
using Microsoft.EntityFrameworkCore;

namespace LebenChallenge.Infrastructure.Persistence;

public class InMemoryDbContext : DbContext
{
    public InMemoryDbContext(DbContextOptions<InMemoryDbContext> options)
        : base(options) { }

    // This method is called when the model for a derived context is being created.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>().HasKey(t => t.Id);
        // Configure the Id property to be auto-generated
        // This is usually done by the database, but in an in-memory database, we need to specify it explicitly.
        modelBuilder.Entity<TaskItem>().Property(t => t.Id).ValueGeneratedOnAdd();
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
}
