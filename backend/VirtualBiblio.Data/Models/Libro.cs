namespace VirtualBiblio.Data.Models
{
    public class Libro
    {
        public int Id { get; set; } 

        public string Titulo { get; set; } = string.Empty; 

        public string ISBN13 { get; set; } = string.Empty; 

        public string Editorial { get; set; } = string.Empty; 

        public int AnioPublicacion { get; set; } 

        public string Formato { get; set; } = string.Empty; 

        public string Genero { get; set; } = string.Empty; 

        public string Idioma { get; set; } = string.Empty; 

        public string Portada { get; set; } = string.Empty; 

        public string Path { get; set; } = string.Empty; // Ruta del archivo subido

        public string Edicion { get; set; } = string.Empty; 

        public string ContraPortada { get; set; } = string.Empty; 

        //Agregar luego de merge: public int AuthorId { get; set; } 
        //Agregar luego de merge: public virtual Autor Author { get; set; } // Relación con Autor

        // Relación con archivo subido
        public int? ArchivoId { get; set; }
        public Archivo? Archivo { get; set; }
    }
}
