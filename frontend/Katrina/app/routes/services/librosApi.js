// librosApi.js

import axios from 'axios';

// ✅ Configuración base de Axios con manejo de errores
const api = axios.create({
  baseURL: 'http://localhost:5084/api', // Ajusta si el puerto cambia
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Obtener todos los libros
export const getLibros = async () => {
  try {
    const response = await api.get('/libros');
    return response.data;
  } catch (error) {
    console.error('Error al obtener libros:', error);
    throw error;
  }
};

// ✅ Obtener un libro por ID (opcional, por si lo necesitas)
export const getLibroById = async (id) => {
  try {
    const response = await api.get(`/libros/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener libro con ID ${id}:`, error);
    throw error;
  }
};