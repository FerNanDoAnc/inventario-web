import api from './api';
import { Producto } from '@/types';

export const obtenerProductos = async (): Promise<Producto[]> => {
  const res = await api.get('/Products');
  return res.data;
};

export const obtenerProductosPorCategoria = async (idCategoria: number): Promise<Producto[]> => {
  const res = await api.get(`/Products/categoria/${idCategoria}`);
  return res.data;
};

export const agregarProducto = async (producto: Omit<Producto, 'Id'>) => {
  const res = await api.post('/Products', producto);
  return res.data;
};

export const editarProducto = async (id: number, producto: Omit<Producto, 'Id'>) => {
  const res = await api.put(`/Products/${id}`, producto);
  return res.data;
};
