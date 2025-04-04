using Microsoft.EntityFrameworkCore;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Audiolibro> Audiolibros { get; set; }

        public DbSet<Author> Authors { get; set; }
        public DbSet<Libro> Libros { get; set; }
        public DbSet<Archivo> Archivo { get; set; }
    }
}

