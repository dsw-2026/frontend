import { Link } from 'react-router-dom'
import type { Adopter } from '../adopter.model'
import { AvatarZoom } from '@/shared/components/ui/AvatarZoom'

interface AdopterTableProps {
  adopters: Adopter[]
  onDelete: (id: number) => void
}

export function AdopterTable({ adopters, onDelete }: AdopterTableProps) {
  if (adopters.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No hay adoptantes registrados aún.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-300">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
          <tr>
            {/* Avatar - Desktop only */}
            <th className="w-12 px-3 sm:px-6 py-3 hidden md:table-cell"></th>
            
            {/* Primary column */}
            <th className="px-4 sm:px-6 py-3">Nombre</th>
            
            {/* Secondary columns - Hidden on mobile screens */}
            <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Email</th>
            <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Verificado</th>
            
            {/* Actions column */}
            <th className="px-4 sm:px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {adopters.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              {/* Avatar desktop */}
              <td className="px-3 sm:px-6 py-3.5 hidden md:table-cell">
                <AvatarZoom
                  src={item.profilePhoto}
                  alt={`${item.firstName} ${item.lastName}`}
                  fallbackText={item.firstName.charAt(0).toUpperCase()}
                />
              </td>

              {/* Name & Mobile Info */}
              <td className="px-4 sm:px-6 py-3 min-w-0">
                <div className="font-medium text-slate-900 dark:text-slate-100 truncate">
                  {item.firstName} {item.lastName}
                </div>
                {/* Email and status inline badge for mobile view */}
                <div className="flex items-center gap-2 mt-0.5 md:hidden">
                  <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[140px]">
                    {item.email}
                  </span>
                  <span
                    className={`sm:hidden inline-block px-1.5 py-0.2 text-[10px] font-semibold rounded-full border border-transparent ${
                      item.verified
                        ? 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800/40'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/40'
                    }`}
                  >
                    {item.verified ? 'Verificado' : 'No verificado'}
                  </span>
                </div>
              </td>

              {/* Email desktop */}
              <td className="px-4 sm:px-6 py-3.5 hidden md:table-cell text-slate-600 dark:text-slate-300">
                {item.email}
              </td>

              {/* Verified desktop/tablet */}
              <td className="px-4 sm:px-6 py-3.5 hidden sm:table-cell whitespace-nowrap">
                {item.verified ? (
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 border border-transparent dark:border-green-800/40">
                    Sí
                  </span>
                ) : (
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-transparent dark:border-amber-800/40">
                    No
                  </span>
                )}
              </td>

              {/* Action Buttons */}
              <td className="px-4 sm:px-6 py-3 text-right whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1.5">
                  <Link
                    to={`/adopters/${item.id}/edit`}
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