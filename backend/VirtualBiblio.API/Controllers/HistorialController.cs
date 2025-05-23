using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Data;
using VirtualBiblio.Data.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistorialController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetHistorial()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var historial = await _context.Historial
                .Where(h => h.UsuarioId == int.Parse(userId))
                .Select(h => new
                {
                    id = h.Id,
                    tipo = h.Tipo,
                    titulo = h.Titulo,
                    fecha = h.Fecha.ToString("yyyy-MM-dd"),
                    duracion = h.Duracion
                })
                .ToListAsync();

            return Ok(historial);
        }
    }
}