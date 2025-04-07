import React, { useState } from 'react';

interface ContactProps {
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    temaInteres: ''
  });

  const temasInteres = [
    'Promoción de lectura',
    'Alianza ERA',
    'Secretos en red',
    'Materiales educativos',
    'Donaciones',
    'Otro'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de envío del formulario
    console.log('Contact data:', formData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-[#002847] mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-white border border-[#618EB4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#002847] mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-white border border-[#618EB4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="temaInteres" className="block text-sm font-medium text-[#002847] mb-1">
            Tema de Interés
          </label>
          <select
            id="temaInteres"
            name="temaInteres"
            value={formData.temaInteres}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-white border border-[#618EB4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors"
            required
          >
            <option value="">Selecciona un tema</option>
            {temasInteres.map((tema) => (
              <option key={tema} value={tema}>
                {tema}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="asunto" className="block text-sm font-medium text-[#002847] mb-1">
            Asunto
          </label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-white border border-[#618EB4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-[#002847] mb-1">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-4 py-3 bg-white border border-[#618EB4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors resize-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-3 pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#618EB4] hover:bg-[#002847] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#618EB4] transition-colors"
          >
            Enviar Mensaje
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full flex justify-center py-3 px-4 border border-[#618EB4] rounded-lg shadow-sm text-sm font-medium text-[#002847] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#618EB4] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact; 