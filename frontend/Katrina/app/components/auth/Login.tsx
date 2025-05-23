import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from '@remix-run/react';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    try {
      // Enviar solicitud al backend para autenticar
      const response = await axios.post('http://localhost:5084/api/auth/login', {
        correo: formData.email, // Ajusta el nombre del campo según tu API
        contraseña: formData.password, // Ajusta el nombre del campo según tu API
      });

      // Obtener el token y el rol de la respuesta
      const { token, role } = response.data;

      // Guardar el token y el rol en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      navigate('/admin');

      // Cerrar el modal
      onClose();

      // Redirigir según el rol (opcional)
      if (role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Manejar errores
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      } else {
        setError('Error al conectar con el servidor. Intenta de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {/* Mostrar mensaje de error si existe */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label htmlFor="password" className="block text-sm font-medium text-[#002847] mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-white border border-[#618EB4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#618EB4] focus:ring-[#618EB4] border-[#618EB4] rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#002847]">
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              className="font-medium text-[#618EB4] hover:text-[#002847] transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-3 pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#618EB4] hover:bg-[#002847] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#618EB4] transition-colors"
          >
            Iniciar Sesión
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

export default Login;