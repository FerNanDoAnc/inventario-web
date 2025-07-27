'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import EditModal from './productos/EditModal';
import AddModal from './productos/AddModal';
import { Categoria, Producto } from '@/types';
import ProductsTable from '@/components/ProductTable';
import { eliminarProducto, obtenerProductos } from '@/services/productos.service';
import { obtenerCategorias } from '@/services/categorias.service';
import { FaPlus } from 'react-icons/fa';

export default function HomePage() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reinicia la paginación
  };

  const fetchProducts = async () => {
    const res = await obtenerProductos();
    setProducts(res);
  };

  const fetchCategories = async () => {
    const res = await obtenerCategorias();
    setCategories(res);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.CategoryId === selectedCategory)
    : products;

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await eliminarProducto(id);
        alert('Producto eliminado correctamente');
        fetchProducts();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Inventario de Productos</h1>

      <div className="row mb-3 mt-5">
        <div className="col-md-3">
          <h4 className="mb-4 fw-bolder">Categorías</h4>
          <ul className="list-group">
            <li
              className={`list-group-item ${selectedCategory === 0 ? 'active' : ''}`} 
              role="button" onClick={() => handleCategoryChange(0)}>
              Todas
            </li>
            {categories.map(cat => (
              <li
                key={cat.Id}
                className={`list-group-item ${selectedCategory === cat.Id ? 'active' : ''}`}
                role="button"
                onClick={() => handleCategoryChange(cat.Id || 0)}
              >
                {cat.Name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-9 ps-4">
          <div className="d-flex justify-content-end mb-2">
            <button className="btn btn-primary py-2" onClick={() => setShowAddModal(true)}>
              <FaPlus className="me-1" /> Agregar Producto
            </button>
          </div>
          <div className="d-flex justify-content-end mb-2">
            <ProductsTable
              productos={filteredProducts}
              onEdit={product => setEditingProduct(product)}
              onDelete={handleDelete}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddModal
          onClose={() => setShowAddModal(false)}
          show={showAddModal}
          onProductAdded={fetchProducts}
          categories={categories}
        />
      )}
      {editingProduct && (
        <EditModal
          product={editingProduct}
          show={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={fetchProducts}
          categories={categories}
        />
      )}
    </div>
  );
}
