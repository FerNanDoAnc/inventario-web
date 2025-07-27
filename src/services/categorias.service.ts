import api from './api';
import { Categoria } from '@/types';

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const res = await api.get('/Categories/GetAllCategory');
  return res.data;
};

export const agregarCategoria = async (categoria: Omit<Categoria, 'Id'>) => {
  const res = await api.post('/Categories/InsertCategory', categoria);
  return res.data;
};

export const actualizarCategoria = async (categoria: Categoria) => {
  const res = await api.put(`/Categories/UpdateCategory/${categoria.Id}`, categoria);
  return res.data;
};

export const eliminarCategoria = async (id: number) => {
  const res = await api.delete(`/Categories/DeleteCategory/${id}`);
  return res.data;
};