import React, { useState } from 'react';

interface RegisterProps {
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<{
    nombre?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí irá la lógica de registro
      console.log('Register data:', formData);
    }
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
            className={`mt-1 block w-full px-4 py-3 bg-white border ${
              errors.nombre ? 'border-red-500' : 'border-[#618EB4]'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors`}
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
          )}
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
            className={`mt-1 block w-full px-4 py-3 bg-white border ${
              errors.email ? 'border-red-500' : 'border-[#618EB4]'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
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
            className={`mt-1 block w-full px-4 py-3 bg-white border ${
              errors.password ? 'border-red-500' : 'border-[#618EB4]'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#002847] mb-1">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`mt-1 block w-full px-4 py-3 bg-white border ${
              errors.confirmPassword ? 'border-red-500' : 'border-[#618EB4]'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#618EB4] focus:border-[#618EB4] text-[#002847] transition-colors`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex flex-col space-y-3 pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#618EB4] hover:bg-[#002847] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#618EB4] transition-colors"
          >
            Registrarse
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

export default Register; 