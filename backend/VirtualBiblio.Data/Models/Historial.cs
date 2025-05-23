namespace VirtualBiblio.Data.Models
{
    public class Historial
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Tipo { get; set; } 
        public string Titulo { get; set; }
        public DateTime Fecha { get; set; }
        public string Duracion { get; set; } 
        public Usuario Usuario { get; set; } 
    }
}