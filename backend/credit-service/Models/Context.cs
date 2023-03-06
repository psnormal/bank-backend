using System;
using System.Runtime.ConstrainedExecution;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;

namespace credit_service.Models
{
	public class Context: DbContext
	{
        public DbSet<CreditRate> CreditRates { get; set; }
        public DbSet<Credit> Credit { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {
            Database.EnsureCreated();
        }
        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserToken>()
                .HasKey(c => new { c.UserId });
            modelBuilder.Entity<UsersMovies>()
                .HasKey(c => new { c.MovieId, c.UserId });
            modelBuilder.Entity<Review>()
                .HasKey(c => new { c.MovieId, c.UserId });
        }*/
    }
}

