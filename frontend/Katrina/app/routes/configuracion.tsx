import React, { useState } from 'react';

export default function Configuracion() {
  const [settings, setSettings] = useState({
    notificaciones: true,
    idioma: 'es',
    tema: 'claro',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setSettings(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));
  };

  const handleSave = () => {
    alert('Configuración guardada: ' + JSON.stringify(settings));
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-[#d9b38c] to-[#8d5524] min-h-screen">
      <h1 className="text-4xl font-bold text-[#002847] mb-6 text-center">Cámara Secreta</h1>
      <p className="text-center text-gray-700 mb-6">Desbloquea tus preferencias ocultas</p>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-[#618EB4]">
        <h2 className="text-2xl font-semibold text-[#002847] mb-4">Ajustes Personales</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-lg">
              <input
                type="checkbox"
                name="notificaciones"
                checked={settings.notificaciones}
                onChange={handleChange}
                className="mr-2"
              />
              Recibir notificaciones
            </label>
          </div>
          <div>
            <label className="block text-lg mb-1">Idioma</label>
            <select
              name="idioma"
              value={settings.idioma}
              onChange={handleChange}
              className="w-full p-2 border border-[#618EB4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618EB4]"
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>
          <div>
            <label className="block text-lg mb-1">Tema</label>
            <select
              name="tema"
              value={settings.tema}
              onChange={handleChange}
              className="w-full p-2 border border-[#618EB4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#618EB4]"
            >
              <option value="claro">Claro</option>
              <option value="oscuro">Oscuro</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 bg-[#618EB4] text-white px-6 py-3 rounded-lg hover:bg-[#002847] transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}