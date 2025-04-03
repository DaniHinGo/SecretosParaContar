import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:5084/api', // Cambia esto por la URL de tu API
});

// Obtener todos los audiolibros
export const getAudiolibros = async () => {
  const response = await api.get('/audiolibro');
  return response.data;
};

// Obtener un audiolibro por ID
export const getAudiolibroById = async (id) => {
  const response = await api.get(`/audiolibro/${id}`);
  return response.data;
};

// Crear un nuevo audiolibro
export const createAudiolibro = async (audiolibro) => {
  const response = await api.post('/audiolibro', audiolibro);
  return response.data;
};

// Actualizar un audiolibro
export const updateAudiolibro = async (id, audiolibro) => {
  const response = await api.put(`/audiolibro/${id}`, audiolibro);
  return response.data;
};

// Eliminar un audiolibro
export const deleteAudiolibro = async (id) => {
  const response = await api.delete(`/audiolibro/${id}`);
  return response.data;
};