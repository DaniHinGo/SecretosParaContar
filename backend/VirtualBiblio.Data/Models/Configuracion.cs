namespace VirtualBiblio.Data.Models
{
    public class Configuracion
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public bool Notificaciones { get; set; }
        public string Idioma { get; set; }
        public string Tema { get; set; }
    }
}