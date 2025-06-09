import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

interface Libro {
  Id: number;
  Titulo: string;
  ISBN13?: string;
  Editorial?: string;
  AnioPublicacion?: number;
  Formato?: string;
  Genero?: string;
  Idioma?: string;
  Portada: string;
  Path?: string;
  Edicion?: string;
  ContraPortada?: string;
  ArchivoId?: number;
  Archivo?: any;
  Descargas?: number;
  FechaSubida?: string;
}

export const loader = async () => {
  const libros = [
    { Id: 1, Titulo: "Autum", Portada: "autum.png" },
    { Id: 2, Titulo: "Gato", Portada: "gato.jpg" },
    { Id: 3, Titulo: "Harry", Portada: "harry.jpg" },
    { Id: 4, Titulo: "Predro", Portada: "pedro.png" },
    { Id: 5, Titulo: "Principito", Portada: "principito.jpg" },
    { Id: 6, Titulo: "Vestidos", Portada: "vestidos.jpg" },
  ];
  return json<Libro[]>(libros);
};

export default function Biblioteca() {
  const libros = useLoaderData<Libro[]>();
  const [selectedLibro, setSelectedLibro] = useState<Libro | null>(null);

  const handleReadOnline = (id: number) => {
    window.open(`/api/libros/${id}/leer`, '_blank');
  };

  const handleDownload = (id: number) => {
    const link = document.createElement("a");
    link.href = `/api/libros/${id}/descargar`;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setSelectedLibro(null);
  };

  return (
    <section className="bg-[#F8F8F8] py-12 text-center">
      <h2 className="text-[#FA4616] text-2xl font-bold">Biblioteca</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-6">
        {Array.isArray(libros) && libros.length > 0 ? (
          libros.map((libro) => (
            <div
              key={libro.Id}
              className="bg-white p-6 shadow-md rounded-lg h-full flex flex-col justify-between"
            >
              <img
                src={`/images/${libro.Portada}`} // Aquí está el src
                alt={libro.Titulo}
                className="w-full h-56 object-contain bg-white p-2 rounded"
                onError={(e) => {
                  console.error(`Imagen no encontrada: /images/${libro.Portada}`);
                  e.currentTarget.src = '/images/placeholder.jpg';
                }}
              />
              <p className="text-[#FA4616] font-bold mt-2 flex-grow">
                {libro.Titulo}
              </p>
              <div className="flex justify-between mt-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleReadOnline(libro.Id);
                  }}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Leer en línea
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload(libro.Id);
                  }}
                  className="text-green-500 hover:underline cursor-pointer"
                >
                  Descargar
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">No hay libros disponibles.</p>
        )}
      </div>

      {selectedLibro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-[#FA4616] text-xl font-bold mb-4">
              {selectedLibro.Titulo}
            </h3>
            <iframe
              src={`/api/libros/${selectedLibro.Id}/leer`}
              title={selectedLibro.Titulo}
              className="w-full h-64 mb-4"
            />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-[#FA4616] text-white rounded hover:bg-opacity-80"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}