using System.Collections.Generic;
using System.Threading.Tasks;
using VirtualBiblio.Data.Models;
using VirtualBiblio.Data.Repositories;

namespace VirtualBiblio.Business.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Usuario>> GetUsuarios()
        {
            return await _repository.GetUsuarios();
        }

        public async Task<Usuario> GetUsuarioById(int id)
        {
            return await _repository.GetUsuarioById(id);
        }

        public async Task<bool> UsuarioExiste(string correo)
        {
            var usuario = await _repository.GetUsuarioByCorreo(correo);
            return usuario != null;
        }

        public async Task<bool> AddUsuario(Usuario usuario)
        {
            if (await UsuarioExiste(usuario.Correo))
                return false;

            // Asignar valores por defecto
            usuario.Rol = usuario.Rol ?? "User"; // Rol por defecto: "User"
            usuario.IsActive = true; // Nuevo usuario activo por defecto

            await _repository.AddUsuario(usuario);
            return true;
        }

        public async Task UpdateUsuario(Usuario usuario)
        {
            await _repository.UpdateUsuario(usuario);
        }

        public async Task DeactivateUsuario(int id)
        {
            var usuario = await _repository.GetUsuarioById(id);
            if (usuario != null)
            {
                usuario.IsActive = false; // Desactivar en lugar de eliminar
                await _repository.UpdateUsuario(usuario);
            }
        }
    }
}