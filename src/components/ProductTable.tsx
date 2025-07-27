// ProductsTable.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Button from './ui/button';
import AddModal from '../app/productos/AddModal';
import EditModal from '@/app/productos/EditModal';
import { Producto } from '@/types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Props {
  productos: Producto[];
  onEdit?: (product: Producto) => void;
  onDelete?: (id: number) => void;
  itemsPerPage?: number;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
}

const ProductsTable = ({ productos, onEdit, onDelete, itemsPerPage = 8,  currentPage, setCurrentPage }: Props) => {
  const [internalPage, setInternalPage] = useState(1);
  const activePage = currentPage ?? internalPage;
  const updatePage = setCurrentPage ?? setInternalPage;

  
  useEffect(() => {
    const totalPages = Math.ceil(productos.length / itemsPerPage);
    if (activePage > totalPages) {
      updatePage(1);
    }
  }, [productos]);

  if (!productos) return <p>Cargando productos...</p>;

  const totalPages = Math.ceil(productos.length / itemsPerPage);

  const handlePrevious = () => {
    updatePage(Math.max(activePage - 1, 1));
  };

  const handleNext = () => {
    updatePage(Math.min(activePage + 1, totalPages));
  };


   const startIndex = (activePage - 1) * itemsPerPage;
  const currentProducts = productos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-100 d-flex flex-column ">
    <table className="border">
      <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Precio</th>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Categoría</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
      <tbody>
        {currentProducts.map((product) => (
          <tr key={product.Id}>
            <td className="py-2 px-4">{product.Name}</td>
            <td className="py-2 px-4">
              {typeof product.Price === 'number'
                ? `$${product.Price.toFixed(2)}`
                : 'Precio no disponible'
              }
            </td>
            <td className="py-2 px-4">{product.Stock}</td>
            <td className="py-2 px-4">{product.CategoryName}</td>
            <td className="py-2 px-4 d-flex justify-content-between">
              <Button className="btn btn-warning" onClick={() => onEdit?.(product)}>
                <FaEdit />
              </Button>
              <Button
                  className="btn btn-danger"
                  onClick={() => {
                    if (confirm(`¿Estás seguro de eliminar el producto ${product.Name}?`)) {
                      onDelete?.(product.Id || 0);
                    }
                  }}
                >
                  <FaTrash />
                </Button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
      <div className="d-flex justify-content-end align-items-center mt-3 gap-3">
        <span className="text-muted">
          Página {currentPage} de {totalPages}
        </span>
        <div className="btn-group">
          <Button
            className="btn btn-outline-secondary"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            className="btn btn-outline-secondary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default ProductsTable;
