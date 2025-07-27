'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProductTable from '@/components/ProductTable';
import { Producto } from '@/types';
import { obtenerProductos, obtenerProductosPorCategoria } from '@/services/productos.service';

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  const cargarProductos = async (idCategoria?: number | null) => {
    const data = idCategoria
      ? await obtenerProductosPorCategoria(idCategoria)
      : await obtenerProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
    console.log('Cargando productos...', productos);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar onSelect={(id) => cargarProductos(id)} />
      <div className="p-4 flex-grow-1">
        <h3>Productos</h3>
        <ProductTable productos={productos} />
      </div>
    </div>
  );
}
