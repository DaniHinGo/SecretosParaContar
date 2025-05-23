using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Data;
using VirtualBiblio.Data.Models;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfiguracionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConfiguracionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetConfiguracion()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var configuracion = await _context.Configuraciones
                .FirstOrDefaultAsync(c => c.UsuarioId == int.Parse(userId));

            if (configuracion == null)
            {
                configuracion = new Configuracion
                {
                    UsuarioId = int.Parse(userId),
                    Notificaciones = true,
                    Idioma = "es",
                    Tema = "claro"
                };
                _context.Configuraciones.Add(configuracion);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                notificaciones = configuracion.Notificaciones,
                idioma = configuracion.Idioma,
                tema = configuracion.Tema
            });
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateConfiguracion([FromBody] ConfiguracionDTO config)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var configuracion = await _context.Configuraciones
                .FirstOrDefaultAsync(c => c.UsuarioId == int.Parse(userId));

            if (configuracion == null)
            {
                configuracion = new Configuracion { UsuarioId = int.Parse(userId) };
                _context.Configuraciones.Add(configuracion);
            }

            configuracion.Notificaciones = config.Notificaciones;
            configuracion.Idioma = config.Idioma;
            configuracion.Tema = config.Tema;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

    public class ConfiguracionDTO
    {
        public bool Notificaciones { get; set; }
        public string Idioma { get; set; }
        public string Tema { get; set; }
    }
}