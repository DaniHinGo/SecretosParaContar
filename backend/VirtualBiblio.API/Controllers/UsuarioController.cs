using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Data.Models;
using VirtualBiblio.Business.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;

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

        // Obtener todos los usuarios (solo para administradores)
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            var usuarios = await _service.GetUsuarios();
            return Ok(usuarios);
        }

        // Obtener un usuario por ID (solo para administradores)
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarioById(int id)
        {
            var usuario = await _service.GetUsuarioById(id);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }

        // Nuevo método: Obtener datos del usuario autenticado
        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<object>> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var usuario = await _service.GetUsuarioById(int.Parse(userId));
            if (usuario == null) return NotFound();

            return Ok(new
            {
                nombre = usuario.Nombre,
                correo = usuario.Correo,
                librosLeidos = 0, // Agrega lógica real si tienes esta métrica
                audiolibrosEscuchados = 0, // Agrega lógica real si tienes esta métrica
                notas = usuario.Notas ?? "",
                logros = new[] // Ejemplo de logros (puedes conectar con una tabla de logros)
                {
                    new { id = 1, nombre = "Explorador", descripcion = "Leíste 3 libros", ganado = true }
                }
            });
        }

        // Nuevo método: Actualizar notas del usuario autenticado
        [Authorize]
        [HttpPut("notas")]
        public async Task<IActionResult> UpdateNotas([FromBody] UpdateNotasDto notasDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var usuario = await _service.GetUsuarioById(int.Parse(userId));
            if (usuario == null) return NotFound();

            usuario.Notas = notasDto.Notas;
            await _service.UpdateUsuario(usuario);
            return NoContent();
        }

        // Registrar un nuevo usuario (público, para permitir registro)
        [HttpPost]
        public async Task<ActionResult<Usuario>> AddUsuario(Usuario usuario)
        {
            if (!await _service.AddUsuario(usuario))
                return Conflict("El correo ya está registrado.");

            return CreatedAtAction(nameof(GetUsuarioById), new { id = usuario.Id }, usuario);
        }

        // Editar un usuario (solo para administradores)
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, [FromBody] UsuarioEditDto usuarioDto)
        {
            var usuario = await _service.GetUsuarioById(id);
            if (usuario == null) return NotFound();
            if (id != usuario.Id) return BadRequest();

            usuario.Nombre = usuarioDto.Username ?? usuario.Nombre;
            usuario.Correo = usuarioDto.Correo ?? usuario.Correo;
            usuario.Rol = usuarioDto.Role ?? usuario.Rol;

            await _service.UpdateUsuario(usuario);
            return NoContent();
        }

        // Desactivar un usuario (solo para administradores)
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeactivateUsuario(int id)
        {
            var usuario = await _service.GetUsuarioById(id);
            if (usuario == null) return NotFound();

            usuario.IsActive = false;
            await _service.UpdateUsuario(usuario);
            return NoContent();
        }
    }

    // DTO para la edición de usuarios
    public class UsuarioEditDto
    {
        public string Username { get; set; }
        public string Correo { get; set; }
        public string Role { get; set; }
    }

    // DTO para actualizar notas
    public class UpdateNotasDto
    {
        public string Notas { get; set; }
    }
}