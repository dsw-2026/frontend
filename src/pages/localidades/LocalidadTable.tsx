import { Link } from 'react-router-dom'
import type { Localidad } from '../../models/localidad'
import { Button } from '../../components/ui/Button'

interface LocalidadTableProps {
  localidades: Localidad[]
  onDelete: (id: number) => void
}

export function LocalidadTable({ localidades, onDelete }: LocalidadTableProps) {
  if (localidades.length === 0) {
    return <p className="empty-state">Todavía no hay localidades cargadas.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código postal</th>
            <th>Provincia</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {localidades.map((localidad) => (
            <tr key={localidad.id}>
              <td>{localidad.nombre}</td>
              <td>{localidad.codigoPostal}</td>
              {/* .provincia viene poblada por el backend (ver populate en
                  localidad.controller.ts), así que ya tenemos el nombre
                  sin pedirlo aparte. */}
              <td>{localidad.provincia.nombre}</td>
              <td className="data-table-actions">
                <Link to={`/localidades/${localidad.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(localidad.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
