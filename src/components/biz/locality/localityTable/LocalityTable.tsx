import { Link } from 'react-router-dom'
import type { Locality } from '../../../../models/locality'
import { Button } from '../../../shared/ui/button/Button'

interface LocalityTableProps {
  localities: Locality[]
  onDelete: (id: number) => void
}

export function LocalityTable({ localities, onDelete }: LocalityTableProps) {
  if (localities.length === 0) {
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
          {localities.map((locality) => (
            <tr key={locality.id}>
              <td>{locality.name}</td>
              <td>{locality.postalCode}</td>
              <td>{locality.province.name}</td>
              <td className="data-table-actions">
                <Link to={`/localidades/${locality.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(locality.id)}>
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