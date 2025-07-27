'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { actualizarCategoria } from '@/services/categorias.service';
import { Categoria } from '@/types';

interface EditCategoryModalProps {
  show: boolean;
  onClose: () => void;
  onCategoryUpdated: () => void;
  category: Categoria;
}

export default function EditCategoryModal({
  show,
  onClose,
  onCategoryUpdated,
  category,
}: EditCategoryModalProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(category?.Name || '');
  }, [category]);

  const handleSubmit = async () => {
    if (!name.trim()) return alert('El nombre es requerido.');

    const response = await actualizarCategoria({
      Id: category.Id,
      Name: name,
    });

    if (response.exito) {
      Swal.fire({
        title: 'Categoría actualizada',
        icon: 'success',
      });
      onCategoryUpdated();
      onClose();
    } else {
      Swal.fire({
        title: 'Error',
        text: response.mensaje || 'No se pudo actualizar la categoría.',
        icon: 'error',
      });
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nuevo nombre"
            />
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
