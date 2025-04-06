import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLibros } from "../routes/services/librosApi";

export const loader = async () => {
  try {
    const libros = await getLibros();
    return json(libros);
  } catch (error) {
    console.error("Error cargando libros:", error);
    throw new Response("Error al cargar libros", {
      status: 500,
    });
  }
};

export default function Biblioteca() {
  const libros = useLoaderData();

  return (
    <section className="bg-[#F8F8F8] py-12 text-center">
      <h2 className="text-[#FA4616] text-2xl font-bold">Biblioteca</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-6">
        {Array.isArray(libros) && libros.length > 0 ? (
          libros.map((libro) => (
            <div
              key={libro.id}
              className="bg-white p-6 shadow-md rounded-lg h-full flex flex-col justify-between"
            >
              <img
                src={`http://localhost:5084/${libro.imagen}`}
                alt={libro.titulo}
                className="w-full h-56 object-contain bg-white p-2 rounded"
              />
              <p className="text-[#FA4616] font-bold mt-2 flex-grow">
                {libro.titulo}
              </p>
              <div className="flex justify-between mt-2">
                <a
                  href={`http://localhost:5084/api/libros/leer/${libro.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Leer en línea
                </a>
                <a
                  href={`http://localhost:5084/api/libros/descargar/${libro.id}`}
                  className="text-green-500 hover:underline"
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
    </section>
  );
}
