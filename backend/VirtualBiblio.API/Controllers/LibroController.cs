using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using VirtualBiblio.Data.Models;
using VirtualBiblio.Business.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private readonly LibroService _service;
        private readonly IWebHostEnvironment _env;

        public LibroController(LibroService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
        }

        // 🔹 Obtener todos los libros
        [HttpGet]
        public async Task<IEnumerable<Libro>> GetLibros()
        {
            return await _service.GetLibros();
        }

        // 🔹 Obtener un libro por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Libro>> GetLibroById(int id)
        {
            var libro = await _service.GetLibroById(id);
            if (libro == null) return NotFound();
            return libro;
        }

        // 🔹 Descargar el archivo del libro
        [HttpGet("descargar/{id}")]
        public async Task<IActionResult> DescargarLibro(int id)
        {
            var libro = await _service.GetLibroById(id);
            if (libro == null || string.IsNullOrEmpty(libro.Path))
                return NotFound(new { message = "Libro no encontrado o no disponible para descarga." });

            var filePath = Path.Combine(_env.WebRootPath ?? "wwwroot", "ArchivosSubidos", libro.Path);

            if (!System.IO.File.Exists(filePath))
                return NotFound(new { message = "El archivo del libro no existe en el servidor." });

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            var contentType = "application/pdf"; // Puedes usar MimeMapping si quieres detectar el tipo real

            return File(stream, contentType, Path.GetFileName(filePath));
        }

        // 🔹 Obtener la URL para leer en línea
        [HttpGet("leer/{id}")]
        public async Task<IActionResult> LeerLibro(int id)
        {
            var libro = await _service.GetLibroById(id);
            if (libro == null || string.IsNullOrEmpty(libro.Path))
                return NotFound(new { message = "Libro no encontrado o no disponible para lectura." });

            var fileUrl = $"{Request.Scheme}://{Request.Host}/ArchivosSubidos/{libro.Path}";
            return Ok(new { url = fileUrl });
        }

        // 🔹 Agregar un libro (solo Admin)
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Libro>> AddLibro([FromBody] Libro libro)
        {
            await _service.AddLibro(libro);
            return CreatedAtAction(nameof(GetLibroById), new { id = libro.Id }, libro);
        }

        // 🔹 Actualizar un libro (solo Admin)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateLibro(int id, [FromBody] Libro libro)
        {
            if (id != libro.Id) return BadRequest();
            await _service.UpdateLibro(libro);
            return NoContent();
        }

        // 🔹 Eliminar un libro (solo Admin)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteLibro(int id)
        {
            await _service.DeleteLibro(id);
            return NoContent();
        }

        // 🔹 Buscar libros por criterios
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
