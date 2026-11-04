import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePetList, useDeletePet } from '../usePets'
import { useSpeciesList } from '@/features/species/useSpecies'
import { PetTable } from '../components/PetTable'
import { ApiError } from '@/shared/api/httpClient'
import { useAuth } from '@/shared/api/useAuth'

export function PetListPage() {
  const { user } = useAuth()
  const isPublisher = user?.userType === 'Publisher'

  const { data: pets = [], isLoading, error } = usePetList()
  const { data: species = [] } = useSpeciesList()
  const deletePet = useDeletePet()
  const [speciesId, setSpeciesId] = useState('')

  const filtered = useMemo(
    () => (speciesId ? pets.filter((p) => String(p.species?.id ?? p.species) === speciesId) : pets),
    [pets, speciesId],
  )
  function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta mascota?')) return
    deletePet.mutate(id, {
      onError: (err) => window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la mascota'),
    })
  }

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar las mascotas' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Mascotas
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gestiona las mascotas publicadas.
          </p>
        </div>
        {isPublisher && (
          <Link
            to="/pets/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            + Nueva mascota
          </Link>
        )}
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
      <label htmlFor="species-filter" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Especie
      </label>
      <select
        id="species-filter"
        value={speciesId}
        onChange={(e) => setSpeciesId(e.target.value)}
        className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
      >
        <option value="">Todas las especies</option>
        {species.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
    </div>
      {!isLoading && !errorMessage && (
        <PetTable pets={filtered} showPublisher={!isPublisher} onDelete={handleDelete} />
      )}
    </section>
  )
}