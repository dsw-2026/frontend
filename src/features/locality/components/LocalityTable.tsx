import { Link } from 'react-router-dom'
import type { Locality } from '../locality.model'

interface LocalityTableProps {
  localities: Locality[]
  onDelete: (id: number) => void
}

export function LocalityTable({ localities, onDelete }: LocalityTableProps) {
  if (localities.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 font-medium">No hay localidades registradas aún.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-300">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="px-4 sm:px-6 py-3">Nombre</th>
            <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Código postal</th>
            <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Provincia</th>
            <th className="px-4 sm:px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {localities.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <td className="px-4 sm:px-6 py-3.5 min-w-0">
                <div className="font-medium text-slate-900 dark:text-slate-100 truncate">
                  {item.name}
                </div>
                {/* Metadatos agrupados solo para mobile */}
                <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:hidden">
                  <span>CP {item.postalCode}</span>
                  {item.province?.name && (
                    <>
                      <span>•</span>
                      <span className="truncate max-w-[140px]">{item.province.name}</span>
                    </>
                  )}
                </div>
              </td>

              {/* Columnas separadas visibles a partir de tablet/desktop */}
              <td className="px-4 sm:px-6 py-3.5 hidden sm:table-cell text-slate-600 dark:text-slate-300">
                {item.postalCode}
              </td>
              <td className="px-4 sm:px-6 py-3.5 hidden md:table-cell text-slate-600 dark:text-slate-300">
                {item.province?.name}
              </td>

              <td className="px-4 sm:px-6 py-3.5 text-right whitespace-nowrap">
                <div className="inline-flex items-center justify-end gap-1.5">
                  <Link
                    to={`/localities/${item.id}/edit`}
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