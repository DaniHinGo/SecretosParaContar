using Microsoft.EntityFrameworkCore;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}

