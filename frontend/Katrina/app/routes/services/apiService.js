import axiosInstance from '../utils/axiosConfig';

export const fetchBibliotecaData = async () => {
  try {
    const response = await axiosInstance.get('/biblioteca'); //enpoint de la API
    return response.data;
  } catch (error) {
    console.error('Error fetching biblioteca data:', error);
    throw error;
  }
};
