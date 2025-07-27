// ProductsTable.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './ui/button';
import AddModal from '../app/productos/AddModal';
import EditModal from '@/app/productos/EditModal';
import { Producto } from '@/types';
interface Props {
  productos: Producto[];
  onEdit?: (product: Producto) => void;
}

const ProductsTable = ({ productos, onEdit }: Props) => {
  console.log('Rendering ProductsTable with products:', productos);
   if (!productos) return <p>Cargando productos...</p>;

  return (
    <table className="min-w-full border">
      <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
      <tbody>
        {productos.map((product) => (
          <tr key={product.Id}>
            <td>{product.Name}</td>
            <td>
              {typeof product.Price === 'number'
                ? `$${product.Price.toFixed(2)}`
                : 'Precio no disponible'
              }
            </td>
            <td>{product.Stock}</td>
            <td>{product.CategoryName}</td>
            <td>
              <Button onClick={() => onEdit?.(product)}>Editar</Button>
            </td>
          </tr>
        ))}
      </tbody>
      {/* {showAddModal && (
        <AddModal
          onClose={() => setShowAddModal(false)}
          onSave={() => {
            fetchProducts();
            setShowAddModal(false);
          }}
        />
      )}

      {showEditModal && selectedProduct && (
        <EditModal
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            fetchProducts();
            setShowEditModal(false);
          }}
        />
      )} */}
    </table>
  );
};

export default ProductsTable;
