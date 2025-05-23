import React, { useState, useEffect } from 'react';

export default function Historial() {
  const [historial, setHistorial] = useState([
    { id: 1, tipo: 'Libro', titulo: 'Secretos del Bosque', fecha: '2025-05-15', duracion: '30 min' },
    { id: 2, tipo: 'Audiolibro', titulo: 'Leyendas Perdidas', fecha: '2025-05-20', duracion: '1h 15min' },
  ]);

  useEffect(() => {
    // Simulación de datos desde el backend (reemplazar con API real)
    const fetchHistorial = async () => {
      const token = localStorage.getItem('token');
      // Aquí iría una solicitud a /api/historial o similar
    };
    fetchHistorial();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-[#e0c3a1] to-[#a67b5b] min-h-screen">
      <h1 className="text-4xl font-bold text-[#002847] mb-6 text-center">Mapa del Tesoro</h1>
      <p className="text-center text-gray-700 mb-6">Explora tu viaje por los secretos descubiertos</p>

      <div className="relative">
        {/* Línea de tiempo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-[#618EB4]"></div>

        {historial.map((item, index) => (
          <div
            key={item.id}
            className={`mb-8 flex items-center w-full ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`w-5/12 p-4 bg-white rounded-lg shadow-lg ${index % 2 === 0 ? 'ml-4' : 'mr-4'}`}>
              <h3 className="text-xl font-semibold text-[#002847]">{item.titulo}</h3>
              <p className="text-gray-600">Tipo: {item.tipo}</p>
              <p className="text-gray-600">Fecha: {new Date(item.fecha).toLocaleDateString()}</p>
              <p className="text-gray-600">Duración: {item.duracion}</p>
            </div>
            <div className="w-4 h-4 bg-[#618EB4] rounded-full border-4 border-white"></div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => alert('¡Sigue explorando para más tesoros!')}
          className="bg-[#618EB4] text-white px-6 py-3 rounded-lg hover:bg-[#002847] transition-colors"
        >
          Descubrir Más
        </button>
      </div>
    </div>
  );
}