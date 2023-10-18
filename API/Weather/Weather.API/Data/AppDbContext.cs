using Microsoft.EntityFrameworkCore;
using Weather.API.Models;

namespace Weather.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<City> Cities { get; set; }
    }
}
