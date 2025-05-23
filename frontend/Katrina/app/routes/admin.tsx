import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Stat {
  totalUsuarios: number;
  usuariosActivos: number;
  totalLibros: number;
  totalAudiolibros: number;
  descargasLibros: number;
  reproduccionesAudiolibros: number;
  promedioLibrosPorUsuario: number;
  promedioAudiolibrosPorUsuario: number;
  ultimosSubidos: { titulo: string; fechaSubida: string }[];
}

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  role: string;
  isActive: boolean;
}

export default function PanelAdministrativo() {
  // Verificación del lado del cliente
  const userRole = localStorage.getItem('userRole');
  if (userRole !== 'Admin') {
    window.location.href = '/'; // Redirige si no es admin
    return null;
  }

  const [stats, setStats] = useState<Stat | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editUsuario, setEditUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const statsResponse = await axios.get('http://localhost:5084/api/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsResponse.data);

        const usuariosResponse = await axios.get('http://localhost:5084/api/usuario', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(usuariosResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchStats();
  }, []);

  const handleEdit = (usuario: Usuario) => {
    setEditUsuario({ ...usuario });
  };

  const handleUpdate = async () => {
    if (!editUsuario) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5084/api/usuario/${editUsuario.id}`, editUsuario, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(usuarios.map(u => (u.id === editUsuario.id ? editUsuario : u)));
      setEditUsuario(null);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5084/api/usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(usuarios.map(u => (u.id === id ? { ...u, isActive: false } : u)));
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Panel Administrativo</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold">Usuarios</h2>
            <p>Total: {stats.totalUsuarios}</p>
            <p>Activos: {stats.usuariosActivos}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold">Libros</h2>
            <p>Total: {stats.totalLibros}</p>
            <p>Descargas: {stats.descargasLibros}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold">Audiolibros</h2>
            <p>Total: {stats.totalAudiolibros}</p>
            <p>Reproducciones: {stats.reproduccionesAudiolibros}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold">Promedios</h2>
            <p>Libros por usuario: {stats.promedioLibrosPorUsuario.toFixed(2)}</p>
            <p>Audiolibros por usuario: {stats.promedioAudiolibrosPorUsuario.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow col-span-1 md:col-span-2 lg:col-span-4">
            <h2 className="text-lg font-semibold">Últimos Subidos</h2>
            <ul>
              {stats.ultimosSubidos.map((item, index) => (
                <li key={index}>
                  {item.titulo} - {new Date(item.fechaSubida).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Correo</th>
              <th className="py-2 px-4 border">Rol</th>
              <th className="py-2 px-4 border">Estado</th>
              <th className="py-2 px-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td className="py-2 px-4 border">{usuario.nombre}</td>
                <td className="py-2 px-4 border">{usuario.correo}</td>
                <td className="py-2 px-4 border">{usuario.role}</td>
                <td className="py-2 px-4 border">{usuario.isActive ? 'Activo' : 'Inactivo'}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(usuario)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  {usuario.isActive && (
                    <button
                      onClick={() => handleDeactivate(usuario.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Desactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUsuario && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <div className="mb-4">
              <label className="block mb-1">Nombre:</label>
              <input
                type="text"
                value={editUsuario.nombre}
                onChange={(e) => setEditUsuario({ ...editUsuario, nombre: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Correo:</label>
              <input
                type="email"
                value={editUsuario.correo}
                onChange={(e) => setEditUsuario({ ...editUsuario, correo: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Rol:</label>
              <select
                value={editUsuario.role}
                onChange={(e) => setEditUsuario({ ...editUsuario, role: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditUsuario(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}