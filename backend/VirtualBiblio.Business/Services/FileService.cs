using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;
using VirtualBiblio.Data;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.Business.Services
{
    public class FileService : IFileService
    {
        private readonly AppDbContext _context;
        private readonly string _uploadFolder = "ArchivosSubidos";

        public FileService(AppDbContext context)
        {
            _context = context;
            if (!Directory.Exists(_uploadFolder))
            {
                Directory.CreateDirectory(_uploadFolder);
            }
        }

        public async Task<Archivo> SubirArchivoAsync(IFormFile archivo)
        {
            if (archivo == null || archivo.Length == 0)
                throw new ArgumentException("El archivo no es válido.");

            string nombreArchivo = Path.GetFileName(archivo.FileName);
            string rutaArchivo = Path.Combine(_uploadFolder, nombreArchivo);

            using (var stream = new FileStream(rutaArchivo, FileMode.Create))
            {
                await archivo.CopyToAsync(stream);
            }

            var nuevoArchivo = new Archivo
            {
                Nombre = nombreArchivo,
                Tipo = archivo.ContentType,
                Ruta = rutaArchivo,
                Tamano = archivo.Length
            };

            _context.Archivo.Add(nuevoArchivo);
            await _context.SaveChangesAsync();

            return nuevoArchivo;
        }
    }
}
