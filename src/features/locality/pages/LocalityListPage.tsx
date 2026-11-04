import { Link } from 'react-router-dom'
import { useLocalityList, useDeleteLocality } from '../useLocalities'
import { LocalityTable } from '../components/LocalityTable'
import { ApiError } from '@/shared/api/httpClient'
import { useMemo, useState } from 'react'
import { useProvinceList } from '@/features/province/useProvinces'

export function LocalityListPage() {
  const { data: localities = [], isLoading, error } = useLocalityList()
  const { data: provinces = [] } = useProvinceList()
  const deleteLocality = useDeleteLocality()
  const [provinceId, setProvinceId] = useState('')

  const filtered = useMemo(
    () => (provinceId ? localities.filter((l) => String(l.province?.id) === provinceId) : localities),
    [localities, provinceId],
  )
  function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta localidad?')) return
    deleteLocality.mutate(id, {
      onError: (err) => {
        window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la localidad')
      },
    })
  }

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar las localidades' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Localidades
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gestiona las localidades disponibles en la plataforma.
          </p>
        </div>
        <Link 
          to="/localities/new" 
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
        >
          + Nueva localidad
        </Link>
      </div>

      {isLoading && (
        <div className="text-center py-10 text-slate-500 dark:text-slate-400 font-medium">
          Cargando…
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm rounded-lg font-medium">
          {errorMessage}
        </div>
      )}
    <div className="flex flex-wrap items-center gap-3">
  <label htmlFor="province-filter" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
    Provincia
  </label>
  <select
    id="province-filter"
    value={provinceId}
    onChange={(e) => setProvinceId(e.target.value)}
    className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
  >
    <option value="">Todas las provincias</option>
    {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
  </select>
</div>
      {!isLoading && !errorMessage && <LocalityTable localities={filtered} onDelete={handleDelete} />}
    </section>
  )
}