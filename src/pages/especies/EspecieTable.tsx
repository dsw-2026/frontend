import { Link } from 'react-router-dom'
import type { Especie } from '../../models/especie'
import { Button } from '../../components/ui/Button'

interface EspecieTableProps {
  especies: Especie[]
  onDelete: (id: number) => void
}

// Componente "dumb": recibe la lista ya cargada y un callback de borrado.
// No hace fetch, no maneja loading/error — eso es responsabilidad de la
// página que lo usa (EspeciesListPage).
export function EspecieTable({ especies, onDelete }: EspecieTableProps) {
  if (especies.length === 0) {
    return <p className="empty-state">Todavía no hay especies cargadas.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {especies.map((especie) => (
            <tr key={especie.id}>
              <td>{especie.nombre}</td>
              <td className="data-table-actions">
                <Link to={`/especies/${especie.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(especie.id)}>
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
