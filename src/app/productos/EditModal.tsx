'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { editarProducto } from '@/services/productos.service';
import { Categoria, Producto } from '@/types';
import Swal from 'sweetalert2';

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
  product: Producto | null;
  categories: Categoria[];
}

export default function EditModal({ show, onClose, onProductUpdated, product, categories }: EditModalProps) {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (product) {
      setId(product.Id || null);
      setName(product.Name);
      setDescription(product.Description || '');
      setPrice(product.Price.toString());
      setStock(product.Stock.toString());
      setCategoryId(product.CategoryId.toString());
      setCategoryName(product.CategoryName || '');
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!name || !price || !stock || !categoryId || !categoryName) return alert('Todos los campos son requeridos.');

    const response = await editarProducto(
        product?.Id || 0,
        {
            Id: id || 0,
            Name: name,
            Description: description,
            Price: parseFloat(price),
            Stock: parseInt(stock),
            CategoryId: parseInt(categoryId),
            CategoryName: categoryName,
        }
    );

    if (response.exito) {
      Swal.fire({
        title: "Producto actualizado",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error al actualizar el producto",
        text: response.mensaje,
        icon: "error",
      });
    }

    onProductUpdated();
    onClose();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setCategoryId(selectedId);

    // Busca el nombre correspondiente en el array categories
    const selectedCategory = categories.find(cat => cat.Id !== undefined && cat.Id.toString() === selectedId);
    if (selectedCategory) {
      setCategoryName(selectedCategory.Name);
    } else {
      setCategoryName('');
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={categoryId} onChange={handleCategoryChange}>
              <option value=''>Seleccione una categoría</option>
              {categories.map(cat => (
                <option key={cat.Id} value={cat.Id}>{cat.Name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
}
