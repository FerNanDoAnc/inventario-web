import api from './api';
import { Categoria } from '@/types';

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const res = await api.get('/Categories/GetAllCategory');
  return res.data;
};
