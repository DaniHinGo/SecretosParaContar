using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.Business.Services
{
    public interface IFileService
    {
        Task<Archivo> SubirArchivoAsync(IFormFile archivo);
    }
}
