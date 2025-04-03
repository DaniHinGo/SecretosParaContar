using System.Collections.Generic;
using System.Threading.Tasks;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.Data.Repositories
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> GetUsuarios();
        Task<Usuario> GetUsuarioById(int id);
        Task<Usuario> GetUsuarioByCorreo(string correo);
        Task AddUsuario(Usuario usuario);
        Task UpdateUsuario(Usuario usuario);
        Task DeleteUsuario(int id);
    }
}
