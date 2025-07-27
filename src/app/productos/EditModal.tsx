'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { editarProducto } from '@/services/productos.service';
import { Categoria, Producto } from '@/types';

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
  product: Producto | null;
  categories: Categoria[];
}

export default function EditModal({ show, onClose, onProductUpdated, product, categories }: EditModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.Name);
      setPrice(product.Price.toString());
      setStock(product.Stock.toString());
      setCategoryId(product.CategoryId.toString());
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!name || !price || !stock || !categoryId) return alert('Todos los campos son requeridos.');

    await editarProducto(
        product?.Id || 0,
        {
            Name: name,
            Price: parseFloat(price),
            Stock: parseInt(stock),
            CategoryId: parseInt(categoryId),
        }
);

    onProductUpdated();
    onClose();
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
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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
