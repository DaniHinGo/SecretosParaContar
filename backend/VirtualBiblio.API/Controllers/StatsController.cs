using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Business.Services;
using System.Linq;
using System.Threading.Tasks;

namespace VirtualBiblio.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        private readonly LibroService _libroService;
        private readonly AudiolibroService _audiolibroService;

        public StatsController(UsuarioService usuarioService, LibroService libroService, AudiolibroService audiolibroService)
        {
            _usuarioService = usuarioService;
            _libroService = libroService;
            _audiolibroService = audiolibroService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStats()
        {
            var usuarios = await _usuarioService.GetUsuarios();
            var libros = await _libroService.GetLibros();
            var audiolibros = await _audiolibroService.GetAudiolibros();

            var stats = new
            {
                TotalUsuarios = usuarios.Count(),
                UsuariosActivos = usuarios.Count(u => u.IsActive),
                TotalLibros = libros.Count(),
                TotalAudiolibros = audiolibros.Count(),
                DescargasLibros = libros.Sum(l => l.Descargas), 
                ReproduccionesAudiolibros = audiolibros.Sum(a => a.Reproducciones), 
                PromedioLibrosPorUsuario = usuarios.Any() ? (double)libros.Count() / usuarios.Count() : 0,
                PromedioAudiolibrosPorUsuario = usuarios.Any() ? (double)audiolibros.Count() / usuarios.Count() : 0,
                UltimosSubidos = libros.Select(l => new { l.Titulo, FechaSubida = l.FechaSubida }) 
                    .Concat(audiolibros.Select(a => new { a.Titulo, FechaSubida = a.FechaSubida })) 
                    .OrderByDescending(f => f.FechaSubida)
                    .Take(5)
            };

            return Ok(stats);
        }
    }
}