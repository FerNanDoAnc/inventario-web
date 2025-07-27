'use client';

import { useEffect, useState } from 'react';
import { obtenerCategorias } from '@/services/categorias.service';
import { Categoria } from '@/types';

export default function Sidebar({ onSelect }: { onSelect: (id: number | null) => void }) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    obtenerCategorias().then(setCategorias);
  }, []);

  return (
    <div className="p-3 border-end">
      <h5>Categorías</h5>
      <ul className="list-group">
        <li className="list-group-item" onClick={() => onSelect(null)}>Todas</li>
        {categorias.map((cat) => (
          <li
            key={cat.Id}
            className="list-group-item"
            onClick={() => onSelect(cat.Id || null)}
            style={{ cursor: 'pointer' }}
          >
            {cat.Name}
          </li>
        ))}
      </ul>
    </div>
  );
}
