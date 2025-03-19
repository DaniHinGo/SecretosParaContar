using VirtualBiblio.Data.Repositories;
using VirtualBiblio.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VirtualBiblio.Business.Services
{
    public class UsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Usuario>> GetUsuarios() => _repository.GetUsuarios();
        public Task<Usuario> GetUsuarioById(int id) => _repository.GetUsuarioById(id);
        public Task AddUsuario(Usuario usuario) => _repository.AddUsuario(usuario);
        public Task UpdateUsuario(Usuario usuario) => _repository.UpdateUsuario(usuario);
        public Task DeleteUsuario(int id) => _repository.DeleteUsuario(id);
    }
}

