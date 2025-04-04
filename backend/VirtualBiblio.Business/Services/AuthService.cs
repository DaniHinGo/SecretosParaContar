using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using VirtualBiblio.Data;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.Business.Services;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public string HashPassword(string contraseña)
    {
        return BCrypt.Net.BCrypt.HashPassword(contraseña);
    }

    public bool VerifyPassword(string contraseña, string contraseñaHash)
    {
        return BCrypt.Net.BCrypt.Verify(contraseña, contraseñaHash);
    }

    public async Task<Usuario> Register(Usuario usuario)
    {
        usuario.Contrasena = HashPassword(usuario.Contrasena); // Encriptar la contraseña
        await _context.Usuarios.AddAsync(usuario);
        await _context.SaveChangesAsync();
        return usuario;
    }

    public async Task<string> Login(string correo, string contraseña)
    {
        var usuario = _context.Usuarios.FirstOrDefault(u => u.Correo == correo);
        if (usuario == null || !VerifyPassword(contraseña, usuario.Contrasena))
            return null;

        return GenerateJwtToken(usuario);
    }

    private string GenerateJwtToken(Usuario usuario)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Email, usuario.Correo),
            new Claim(ClaimTypes.Role, usuario.Rol)
        };

        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Issuer"],
            claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
