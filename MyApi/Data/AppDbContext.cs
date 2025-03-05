using MyApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MyApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; } // Table "Users"

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseOracle("User Id=system;Password=2002;Data Source=localhost:1521/FREE");
            }
        }
         public DbSet<Fourniture> Fournitures { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Fourniture>()
                .Property(f => f.PrixU)
                .HasColumnType("DECIMAL(18,2)");

            modelBuilder.Entity<Fourniture>()
                .Property(f => f.PrixTtl)
                .HasColumnType("DECIMAL(18,2)");

            modelBuilder.Entity<Fourniture>()
                .Property(f => f.Montant)
                .HasColumnType("DECIMAL(18,2)");
        }
    }
    }

