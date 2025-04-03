using VirtualBiblio.Data;
using VirtualBiblio.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualBiblio.Business.Services
{
    public class LibroService
    {
        private readonly AppDbContext _context;

        public LibroService(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todos los libros
        public async Task<IEnumerable<Libro>> GetLibros()
        {
            return await _context.Libros.ToListAsync();
        }

        // Obtener un libro por ID
        public async Task<Libro?> GetLibroById(int id)
        {
            return await _context.Libros.FindAsync(id);
        }

        // Agregar un libro
        public async Task AddLibro(Libro libro)
        {
            _context.Libros.Add(libro);
            await _context.SaveChangesAsync();
        }

        // Modificar un libro
        public async Task UpdateLibro(Libro libro)
        {
            _context.Libros.Update(libro);
            await _context.SaveChangesAsync();
        }

        // Eliminar un libro (soft delete si se requiere)
        public async Task DeleteLibro(int id)
        {
            var libro = await _context.Libros.FindAsync(id);
            if (libro != null)
            {
                _context.Libros.Remove(libro);
                await _context.SaveChangesAsync();
            }
        }

        // Método de búsqueda de libros por distintos criterios
        public async Task<IEnumerable<Libro>> BuscarLibros(
            string? titulo, 
            string? autor, 
            string? genero, 
            string? idioma, 
            string? formato, 
            int? anioPublicacion, 
            string? editorial, 
            string? isbn)
        {
            var query = _context.Libros.AsQueryable();

            if (!string.IsNullOrWhiteSpace(titulo))
                query = query.Where(l => l.Titulo.Contains(titulo));

            //Agregar luego de merge:
            // if (!string.IsNullOrWhiteSpace(autor))
            //     query = query.Where(l => l.Author.Nombre.Contains(autor));

            if (!string.IsNullOrWhiteSpace(genero))
                query = query.Where(l => l.Genero.Contains(genero));

            if (!string.IsNullOrWhiteSpace(idioma))
                query = query.Where(l => l.Idioma.Contains(idioma));

            if (!string.IsNullOrWhiteSpace(formato))
                query = query.Where(l => l.Formato.Contains(formato));

            if (anioPublicacion.HasValue)
                query = query.Where(l => l.AnioPublicacion == anioPublicacion);

            if (!string.IsNullOrWhiteSpace(editorial))
                query = query.Where(l => l.Editorial.Contains(editorial));

            if (!string.IsNullOrWhiteSpace(isbn))
                query = query.Where(l => l.ISBN13 == isbn);

            return await query.ToListAsync();
        }
    }
}
