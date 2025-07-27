'use client';

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  title?: string;
}

const DeleteConfirmModal = ({
  show,
  onClose,
  onConfirm,
  message = '¿Estás seguro de que deseas eliminar este elemento?',
  title = 'Confirmar Eliminación',
}: DeleteConfirmModalProps) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Sí, eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
