using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Data.Models;
using VirtualBiblio.Business.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<Usuario>> GetUsuarios()
        {
            return await _service.GetUsuarios();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarioById(int id)
        {
            var usuario = await _service.GetUsuarioById(id);
            if (usuario == null) return NotFound();
            return usuario;
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> AddUsuario(Usuario usuario)
        {
            await _service.AddUsuario(usuario);
            return CreatedAtAction(nameof(GetUsuarioById), new { id = usuario.Id }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, Usuario usuario)
        {
            if (id != usuario.Id) return BadRequest();
            await _service.UpdateUsuario(usuario);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            await _service.DeleteUsuario(id);
            return NoContent();
        }
    }
}
