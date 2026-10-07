
import { Link } from 'react-router-dom'
import type { Species } from '../../../../models/species'
import { Button } from '../../../shared/ui/button/Button'

interface SpeciesTableProps {
  speciesList: Species[]
  onDelete: (id: number) => void
}

export function SpeciesTable({ speciesList, onDelete }: SpeciesTableProps) {
  if (speciesList.length === 0) {
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
          {speciesList.map((species) => (
            <tr key={species.id}>
              <td>{species.name}</td>
              <td className="data-table-actions">
                <Link to={`/especies/${species.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(species.id)}>
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