// librosApi.js

import axios from 'axios';

// ✅ Configuración base de Axios con manejo de errores
const api = axios.create({
  baseURL: 'http://localhost:5084/api', // Asegúrate de que esta ruta sea correcta
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Obtener todos los libros
export const getLibros = async () => {
  try {
    const response = await api.get('/libro');
    return response.data;
  } catch (error) {
    console.error('Error al obtener libros:', error);
    throw error;
  }
};

// ✅ Obtener un libro por ID
export const getLibroById = async (id) => {
  try {
    const response = await api.get(`/libro/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener libro con ID ${id}:`, error);
    throw error;
  }
};

// ✅ Crear un nuevo libro
export const createLibro = async (libro) => {
  try {
    const response = await api.post('/libro', libro);
    return response.data;
  } catch (error) {
    console.error('Error al crear libro:', error);
    throw error;
  }
};

// ✅ Actualizar un libro
export const updateLibro = async (id, libro) => {
  try {
    const response = await api.put(`/libro/${id}`, libro);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar libro con ID ${id}:`, error);
    throw error;
  }
};

// ✅ Eliminar un libro
export const deleteLibro = async (id) => {
  try {
    const response = await api.delete(`/libro/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar libro con ID ${id}:`, error);
    throw error;
  }
};
