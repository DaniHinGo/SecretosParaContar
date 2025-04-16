using System.ComponentModel.DataAnnotations;

namespace VirtualBiblio.Data.Models;

public class Archivo
{
    public int Id { get; set; }
    public string? Nombre { get; set; }
    public string? Tipo { get; set; } // application/pdf, audio/mp3
    public string? Ruta { get; set; }
    public long Tamano { get; set; } // Tamaño en bytes
    public DateTime FechaSubida { get; set; } = DateTime.UtcNow;
}
