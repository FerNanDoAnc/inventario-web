'use client';

import { useEffect, useState } from 'react';
import EditModal from './productos/EditModal';
import AddModal from './productos/AddModal';
import { Categoria, Producto } from '@/types';
import ProductsTable from '@/components/ProductTable';
import { eliminarProducto, obtenerProductos } from '@/services/productos.service';
import { eliminarCategoria, obtenerCategorias } from '@/services/categorias.service';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AddCategoryModal from '@/components/modules/AddCategoryModal';
import EditCategoryModal from '@/components/modules/EditCategoryModal';

export default function HomePage() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Categoria | null>(null);


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
    const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: "btn btn-danger px-4 py-2 ms-4",
            cancelButton: "btn btn-secondary px-4 py-2 me-4"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Eliminar producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed){
            const response = await eliminarProducto(id);
            console.log(response);
            if (response.exito===true) {
                swalWithBootstrapButtons.fire({
                title: "Producto eliminado",
                text: response.mensaje,
                icon: "success"
                }).then(() => {
                    fetchProducts();
                    if (editingProduct?.Id === id) {
                        setEditingProduct(null);
                    }      
                });
              }
            }
        });
  }

  const handleDeleteCategory = async (id: number) => {
  // Validar si la categoría tiene productos
  const productosAsociados = products.filter(p => p.CategoryId === id);
  if (productosAsociados.length > 0) {
    Swal.fire({
      title: "No se puede eliminar",
      text: "Esta categoría tiene productos asociados.",
      icon: "warning"
    });
    return;
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger px-4 py-2 ms-4",
      cancelButton: "btn btn-secondary px-4 py-2 me-4"
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "¿Eliminar categoría?",
    text: "Esta acción es irreversible.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await eliminarCategoria(id);
      if (response.exito) {
        swalWithBootstrapButtons.fire({
          title: "Categoría eliminada",
          text: response.mensaje,
          icon: "success"
        }).then(() => {
          fetchCategories();
          if (editingCategory?.Id === id) {
            setEditingCategory(null);
          }
        });
      } else {
        swalWithBootstrapButtons.fire({
          title: "Error al eliminar",
          text: response.mensaje,
          icon: "error"
        });
      }
    }
  });
};


  return (
    <div className="container mt-4">
      <h1 className="fw-bold">Inventario de Productos</h1>

      <div className="row mb-3 mt-5">
        <div className="col-md-3">
          {/* <h4 className="mb-4 fw-bolder">Categorías</h4> */}
          <div className="d-flex justify-content-between align-items-center mb-3 py-2">
            <h4 className="fw-bolder mb-0">Categorías</h4>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setShowAddCategoryModal(true)}
            >
              <FaPlus className="me-1" /> Agregar
            </button>
          </div>

          <ul className="list-group">
            <li
              className={`list-group-item ${selectedCategory === 0 ? 'active' : ''}`} 
              role="button" onClick={() => handleCategoryChange(0)}>
              Todas
            </li>
            {categories.map(cat => (
              <li
                key={cat.Id}
                className={`list-group-item d-flex justify-content-between align-items-center ${selectedCategory === cat.Id ? 'active' : ''}`}
                role="button"
                onClick={() => handleCategoryChange(cat.Id || 0)}
              >
                <span>{cat.Name}</span>

                <div className="d-inline ms-2">

                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={(e) => {
                      e.stopPropagation(); // evita que se dispare handleCategoryChange
                      setEditingCategory(cat);
                      setShowEditCategoryModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(cat.Id || 0);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-9 ps-4">
          <div className="d-flex justify-content-end mb-2">
            <button className="btn btn-success py-2" onClick={() => setShowAddModal(true)}>
              <FaPlus className="me-1" /> Agregar Producto
            </button>
          </div>
          <div className="d-flex justify-content-end">
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

      {showAddCategoryModal && (
        <AddCategoryModal
          show={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
          onCategoryAdded={() => {
            fetchCategories();
            setShowAddCategoryModal(false);
          }}
        />
      )}
      {showEditCategoryModal && editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          show={showEditCategoryModal}
          onClose={() => {
            setShowEditCategoryModal(false);
            setEditingCategory(null);
          }}
          onCategoryUpdated={() => {
            fetchCategories();
            setShowEditCategoryModal(false);
            setEditingCategory(null);
          }}
        />
      )}

    </div>
  );
}
