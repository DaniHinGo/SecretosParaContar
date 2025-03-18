// filepath: c:\secretosParaContar\frontend\Katrina\app\routes\biblioteca.tsx
import React from 'react';

const libros = [
  { id: 1, titulo: "El Principito", imagen: "/images/principito.jpg" },
  { id: 2, titulo: "autum", imagen: "/images/autum.png" },
  { id: 3, titulo: "El Gato con botas", imagen: "/images/gato.jpg" },
  { id: 4, titulo: "Pedro el gato de pie", imagen: "/images/pedro.png" },
];

export default function Biblioteca() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Biblioteca</h1>
      <p className="text-lg text-center mb-8 text-gray-600">
        Explora nuestra colección de libros.
      </p>

      {/* Grid de libros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {libros.map((libro) => (
          <div key={libro.id} className="bg-white rounded-lg shadow-lg p-4 text-center">
            <img 
              src={libro.imagen} 
              alt={libro.titulo} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{libro.titulo}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}