'use client';

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { agregarProducto } from '@/services/productos.service';
import { Categoria } from '@/types';

interface AddModalProps {
  show: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  categories: Categoria[];
}

export default function AddModal({ show, onClose, onProductAdded, categories }: AddModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async () => {
    if (!name || !price || !stock || !categoryId) return alert('Todos los campos son requeridos.');

    await agregarProducto({
        Name: name,
        Price: parseFloat(price),
        Stock: parseInt(stock),
        CategoryId: parseInt(categoryId),
    });

    onProductAdded();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto</Modal.Title>
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
        <Button variant="primary" onClick={handleSubmit}>Agregar</Button>
      </Modal.Footer>
    </Modal>
  );
}