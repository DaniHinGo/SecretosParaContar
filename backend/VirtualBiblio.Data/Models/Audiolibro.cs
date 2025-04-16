using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VirtualBiblio.Data.Models
{
    public class Audiolibro
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string? Titulo { get; set; }

        [Required]
        public int AutorId { get; set; }

        [Required, MaxLength(100)]
        public string? Genero { get; set; }

        [Required]
        public int NarradorId { get; set; }

        [Required]
        [RegularExpression(@"^\d{1,2}:\d{2}$", ErrorMessage = "Formato inválido. Debe ser HH:MM")]
        public string? Duracion { get; set; }

        [Required, Range(1, int.MaxValue, ErrorMessage = "El tamaño debe ser mayor a 0")]
        public int Tamano { get; set; } // En Megabytes

        [Required]
        public string Path { get; set; } = string.Empty; // Ruta del archivo subido

        //Agregar luego de merge: public int AuthorId { get; set; } 
        //Agregar luego de merge: public virtual Autor Author { get; set; } // Relación con Autor

            // Relación con archivo subido
        public int? ArchivoId { get; set; }
        public Archivo? Archivo { get; set; }
        public int Reproducciones { get; set; } = 0;
        public DateTime FechaSubida { get; set; } = DateTime.Now;
    }
}
