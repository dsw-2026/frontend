import { Link } from 'react-router-dom'
import type { Provincia } from '../../models/provincia'
import { Button } from '../../components/ui/Button'

interface ProvinciaTableProps {
  provincias: Provincia[]
  onDelete: (id: number) => void
}

export function ProvinciaTable({ provincias, onDelete }: ProvinciaTableProps) {
  if (provincias.length === 0) {
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
          {provincias.map((provincia) => (
            <tr key={provincia.id}>
              <td>{provincia.nombre}</td>
              <td>{provincia.codigo}</td>
              <td className="data-table-actions">
                <Link to={`/provincias/${provincia.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(provincia.id)}>
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
