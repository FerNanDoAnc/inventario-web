'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import EditModal from './productos/EditModal';
import AddModal from './productos/AddModal';
import { Categoria, Producto } from '@/types';
import ProductsTable from '@/components/ProductTable';
import { obtenerProductos } from '@/services/productos.service';
import { obtenerCategorias } from '@/services/categorias.service';

export default function HomePage() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);

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

  return (
    <div className="container mt-4">
      <h1>Inventario de Productos</h1>

      <div className="row mb-3">
        <div className="col-md-3">
          <h5>Categorías</h5>
          <ul className="list-group">
            <li className={`list-group-item`} onClick={() => setSelectedCategory(0)}>
              Todas
            </li>
            {categories.map(cat => (
              <li
                key={cat.Id}
                className={`list-group-item`}
                onClick={() => setSelectedCategory(cat.Id || 0)}
              >
                {cat.Name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-9">
          <button className="btn btn-primary mb-2" onClick={() => setShowAddModal(true)}>
            Agregar Producto
          </button>
          <ProductsTable
            productos={filteredProducts}
            onEdit={product => setEditingProduct(product)}
          />
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
