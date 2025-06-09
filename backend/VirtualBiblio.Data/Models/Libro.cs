using System.ComponentModel.DataAnnotations;

namespace VirtualBiblio.Data.Models
{
    public class Libro
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [StringLength(13)]
        public string ISBN13 { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Editorial { get; set; } = string.Empty;

        [Range(1000, 2100)]
        public int AnioPublicacion { get; set; }

        [Required]
        [StringLength(50)]
        public string Formato { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Genero { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Idioma { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Portada { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Path { get; set; } = string.Empty; // Ruta del archivo subido

        [Required]
        [StringLength(50)]
        public string Edicion { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string ContraPortada { get; set; } = string.Empty;

        // Relación con archivo subido
        public int? ArchivoId { get; set; }
        public Archivo? Archivo { get; set; }

        public int Descargas { get; set; } = 0;

        [Required]
        public DateTime FechaSubida { get; set; } = DateTime.UtcNow; // Usar UTC para compatibilidad con PostgreSQL
    }
}