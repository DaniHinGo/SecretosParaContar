using System.ComponentModel.DataAnnotations;

namespace VirtualBiblio.Data.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Nombre { get; set; }

        [Required]
        [EmailAddress]
        public string? Correo { get; set; }

        [Required]
        [MinLength(8)]
        public string? Contrasena { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Rol { get; set; } = "User"; // Por defecto, será "User"

        public bool IsActive { get; set; } = true; // Por defecto, el usuario estará activo
        public string Notas { get; set; }
    }
}
