'use client';

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { agregarProducto } from '@/services/productos.service';
import { Categoria } from '@/types';
import Swal from 'sweetalert2';

interface AddModalProps {
  show: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  categories: Categoria[];
}

export default function AddModal({ show, onClose, onProductAdded, categories }: AddModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async () => {
    if (!name || !price || !stock || !categoryId || !categoryName) return alert('Todos los campos son requeridos.');

    const response = await agregarProducto({
        Name: name,
        Description: description,
        Price: parseFloat(price),
        Stock: parseInt(stock),
        CategoryId: parseInt(categoryId),
        CategoryName: categoryName,
    });

    if (response.CategoryId) {
      Swal.fire({
        title: "Producto agregado",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error al actualizar el producto",
        text: response.mensaje,
        icon: "error",
      });
    }

    onProductAdded();
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
        <Modal.Title>Agregar Producto</Modal.Title>
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
        <Button variant="primary" onClick={handleSubmit}>Agregar</Button>
      </Modal.Footer>
    </Modal>
  );
}