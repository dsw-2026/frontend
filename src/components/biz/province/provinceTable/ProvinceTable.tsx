import { Link } from 'react-router-dom'
import type { Province } from '../../../../models/province'
import { Button } from '../../../shared/ui/button/Button'

interface ProvinceTableProps {
  provinces: Province[]
  onDelete: (id: number) => void
}

export function ProvinceTable({ provinces, onDelete }: ProvinceTableProps) {
  if (provinces.length === 0) {
    return <p className="empty-state">Todavía no hay provincias cargadas.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {provinces.map((province) => (
            <tr key={province.id}>
              <td>{province.name}</td>
              <td>{province.code}</td>
              <td className="data-table-actions">
                <Link to={`/provinces/${province.id}/edit`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(province.id)}>
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