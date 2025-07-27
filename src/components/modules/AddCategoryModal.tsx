'use client';

import { agregarCategoria } from '@/services/categorias.service';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

interface AddCategoryModalProps {
  show: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
}

export default function AddCategoryModal({ show, onClose, onCategoryAdded }: AddCategoryModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) return alert('El nombre es requerido.');

    const response = await agregarCategoria({ Name: name });

    if (response.Name) {
      Swal.fire({
        title: 'Categoría agregada',
        icon: 'success',
      });
      onCategoryAdded();
      onClose();
    } else {
      Swal.fire({
        title: 'Error',
        text: response.mensaje || 'No se pudo agregar la categoría.',
        icon: 'error',
      });
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nombre"
            />
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
