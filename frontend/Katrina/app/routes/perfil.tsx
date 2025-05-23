import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

export default function Perfil() {
  const [userData, setUserData] = useState({
    nombre: 'Bonnie Green',
    correo: localStorage.getItem('userEmail') || 'secretosParaContar@gmail.com',
    librosLeidos: 5,
    audiolibrosEscuchados: 3,
    notas: '',
  });

  const [logros, setLogros] = useState([
    { id: 1, nombre: 'Explorador de Bosques', descripcion: 'Leíste 3 libros sobre naturaleza', ganado: true },
    { id: 2, nombre: 'Cuentista Maestro', descripcion: 'Escuchaste 5 audiolibros', ganado: false },
  ]);

  const [activeTab, setActiveTab] = useState('perfil');

  useEffect(() => {
    // Simulación de datos desde el backend (reemplazar con API real)
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      // Aquí iría una solicitud a /api/usuario o similar
      // Por ahora, usamos datos ficticios
    };
    fetchUserData();
  }, []);

  const handleNoteChange = (e: { target: { value: any; }; }) => {
    setUserData({ ...userData, notas: e.target.value });
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-[#f4e4bc] to-[#d9a66b] min-h-screen">
      <h1 className="text-4xl font-bold text-[#002847] mb-6 text-center">Mi Cuaderno de Aventuras</h1>

      {/* Pestañas de navegación */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setActiveTab('perfil')}
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'perfil' ? 'bg-[#618EB4] text-white' : 'bg-gray-200'}`}
        >
          Perfil
        </button>
        <button
          onClick={() => setActiveTab('notas')}
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'notas' ? 'bg-[#618EB4] text-white' : 'bg-gray-200'}`}
        >
          Notas
        </button>
        <button
          onClick={() => setActiveTab('logros')}
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'logros' ? 'bg-[#618EB4] text-white' : 'bg-gray-200'}`}
        >
          Logros
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#618EB4]">
        {activeTab === 'perfil' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#002847] mb-4">Datos del Aventurero</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg"><strong>Nombre:</strong> {userData.nombre}</p>
                <p className="text-lg"><strong>Correo:</strong> {userData.correo}</p>
              </div>
              <div>
                <p className="text-lg"><strong>Libros Leídos:</strong> {userData.librosLeidos}</p>
                <p className="text-lg"><strong>Audiolibros Escuchados:</strong> {userData.audiolibrosEscuchados}</p>
              </div>
            </div>
            <Link to="/biblioteca" className="mt-4 inline-block bg-[#618EB4] text-white px-4 py-2 rounded hover:bg-[#002847] transition-colors">
              Explorar Más Aventuras
            </Link>
          </div>
        )}

        {activeTab === 'notas' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#002847] mb-4">Mis Secretos Escritos</h2>
            <textarea
              value={userData.notas}
              onChange={handleNoteChange}
              className="w-full h-40 p-2 border border-[#618EB4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618EB4]"
              placeholder="Escribe tus pensamientos o secretos descubiertos..."
            />
            <button
              onClick={() => alert('Notas guardadas (simulación)')}
              className="mt-2 bg-[#618EB4] text-white px-4 py-2 rounded hover:bg-[#002847] transition-colors"
            >
              Guardar Notas
            </button>
          </div>
        )}

        {activeTab === 'logros' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#002847] mb-4">Logros de Aventura</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logros.map((logro) => (
                <div
                  key={logro.id}
                  className={`p-4 rounded-lg ${logro.ganado ? 'bg-green-100' : 'bg-gray-100'}`}
                >
                  <h3 className="text-xl font-medium">{logro.nombre}</h3>
                  <p className="text-gray-600">{logro.descripcion}</p>
                  <span className={`mt-2 inline-block px-2 py-1 rounded ${logro.ganado ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-800'}`}>
                    {logro.ganado ? '¡Logrado!' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}