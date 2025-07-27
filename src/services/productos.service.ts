import api from './api';
import { Producto } from '@/types';

export const obtenerProductos = async (): Promise<Producto[]> => {
  const res = await api.get('/Products/GetAllProducts');
  return res.data;
};

export const obtenerProductosPorCategoria = async (idCategoria: number): Promise<Producto[]> => {
  const res = await api.get(`/Products/categoria/${idCategoria}`);
  return res.data;
};

export const obtenerProductoPorId = async (id: number): Promise<Producto> => {
  const res = await api.get(`/Products/GetProduct/${id}`);
  return res.data;
};

export const agregarProducto = async (producto: Omit<Producto, 'Id'>) => {
  const res = await api.post('/Products/InsertProduct', producto);
  return res.data;
};

export const editarProducto = async (id: number, producto: Producto) => {
  const res = await api.put(`/Products/UpdateProduct/${id}`, producto);
  return res.data;
};

export const eliminarProducto = async (id: number) => {
  const res = await api.delete(`/Products/DeleteProduct/${id}`);
  return res.data;
};
