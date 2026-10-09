import { Link } from 'react-router-dom'
import { PetStatus, type Pet } from '../pet.model'
import { AvatarZoom } from '@/shared/components/ui/AvatarZoom'

interface PetTableProps {
  pets: Pet[]
  showPublisher: boolean
  onDelete: (id: number) => void
}

const STATUS_LABELS: Record<PetStatus, string> = {
  AVAILABLE: 'Disponible',
  IN_PROCESS: 'En proceso',
  ADOPTED: 'Adoptada',
  UNAVAILABLE: 'No disponible',
}

const STATUS_CLASS: Record<PetStatus, string> = {
  AVAILABLE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800/40',
  IN_PROCESS: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/40',
  ADOPTED: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  UNAVAILABLE: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
}

export function PetTable({ pets, showPublisher, onDelete }: PetTableProps) {
  if (pets.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No hay mascotas registradas aún.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-300">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="w-12 px-3 sm:px-6 py-3 hidden sm:table-cell"></th>
            <th className="px-4 sm:px-6 py-3">Nombre</th>
            <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Especie</th>
            {showPublisher && (
              <th className="px-4 sm:px-6 py-3 hidden lg:table-cell">Publicador</th>
            )}
            <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Estado</th>
            <th className="px-4 sm:px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {pets.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              {/* Avatar desktop */}
              <td className="px-3 sm:px-6 py-3.5 hidden sm:table-cell">
                <AvatarZoom
                  src={item.photo}
                  alt={item.name}
                  fallbackText={item.name.charAt(0).toUpperCase()}
                />
              </td>

              {/* Nombre + Detalles en mobile */}
              <td className="px-4 sm:px-6 py-3 min-w-0">
                <div className="font-medium text-slate-900 dark:text-slate-100 truncate">{item.name}</div>
                <div className="flex items-center gap-2 mt-0.5 sm:hidden">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.species?.name}</span>
                  <span className={`inline-block px-2 py-0.2 text-[10px] font-semibold rounded-full border border-transparent ${STATUS_CLASS[item.status]}`}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>
              </td>

              {/* Columnas intermedias desktop */}
              <td className="px-4 sm:px-6 py-3.5 hidden md:table-cell text-slate-600 dark:text-slate-300">
                {item.species?.name}
              </td>
              {showPublisher && (
                <td className="px-4 sm:px-6 py-3.5 hidden lg:table-cell text-slate-600 dark:text-slate-300">
                  {item.publisher?.firstName} {item.publisher?.lastName}
                </td>
              )}
              <td className="px-4 sm:px-6 py-3.5 hidden sm:table-cell whitespace-nowrap">
                <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border border-transparent ${STATUS_CLASS[item.status]}`}>
                  {STATUS_LABELS[item.status]}
                </span>
              </td>

              {/* Acciones */}
              <td className="px-4 sm:px-6 py-3 text-right whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1.5">
                  <Link
                    to={`/pets/${item.id}/edit`}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}