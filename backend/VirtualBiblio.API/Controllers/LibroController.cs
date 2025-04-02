using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Data.Models;
using VirtualBiblio.Business.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private readonly LibroService _service;

        public LibroController(LibroService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<Libro>> GetLibros()
        {
            return await _service.GetLibros();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Libro>> GetLibroById(int id)
        {
            var libro = await _service.GetLibroById(id);
            if (libro == null) return NotFound();
            return libro;
        }

        [HttpPost]
        public async Task<ActionResult<Libro>> AddLibro(Libro libro)
        {
            await _service.AddLibro(libro);
            return CreatedAtAction(nameof(GetLibroById), new { id = libro.Id }, libro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLibro(int id, Libro libro)
        {
            if (id != libro.Id) return BadRequest();
            await _service.UpdateLibro(libro);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibro(int id)
        {
            await _service.DeleteLibro(id);
            return NoContent();
        }

        // Método para buscar libros por diferentes criterios
        [HttpGet("buscar")]
        public async Task<IEnumerable<Libro>> BuscarLibros(
            [FromQuery] string? titulo, 
            [FromQuery] string? autor, 
            [FromQuery] string? genero, 
            [FromQuery] string? idioma, 
            [FromQuery] string? formato, 
            [FromQuery] int? anioPublicacion, 
            [FromQuery] string? editorial, 
            [FromQuery] string? isbn)
        {
            return await _service.BuscarLibros(titulo, autor, genero, idioma, formato, anioPublicacion, editorial, isbn);
        }
    }
}
