using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Business.Services;
using VirtualBiblio.Data.Models;
using VirtualBiblio.Data.Models.Auth;
using System.Threading.Tasks;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario usuario)
        {
            var usuarioRegistrado = await _authService.Register(usuario);
            return CreatedAtAction(nameof(Register), new { id = usuarioRegistrado.Id }, usuarioRegistrado);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.Login(request.Correo, request.Contraseña);
            if (!result.HasValue) // Verificar si result es null
            {
                return Unauthorized(new { mensaje = "Correo o contraseña incorrectos" });
            }

            // Desestructurar la tupla
            var (token, role) = result.Value;

            return Ok(new { token, role });
        }
    }
}
