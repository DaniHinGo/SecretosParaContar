using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VirtualBiblio.Business.Services;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/archivos")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("subir")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SubirArchivo([FromForm] IFormFile archivo)
        {
            if (archivo == null)
            {
                return BadRequest("Debe proporcionar un archivo.");
            }

            var archivoGuardado = await _fileService.SubirArchivoAsync(archivo);
            return Ok(archivoGuardado);
        }
    }
}
