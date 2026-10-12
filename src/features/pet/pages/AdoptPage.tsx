import { useState } from 'react'
import { usePetList } from '../usePets'
import { PetCard } from '../components/PetCard'
import { ApiError } from '@/shared/api/httpClient'
import { useSpeciesList } from '@/features/species/useSpecies'

export function AdoptPage() {
  const [species, setSpecies] = useState<number | undefined>()
  const { data: pets = [], isLoading, error } = usePetList({ status: 'AVAILABLE', species })
  const { data: speciesList = [] } = useSpeciesList()

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar las mascotas' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Mascotas en adopción</h1>
          <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">Encontrá a tu próximo compañero.</p>
        </div>
        <select
          value={species ?? ''}
          onChange={(e) => setSpecies(e.target.value ? Number(e.target.value) : undefined)}
          className="px-3 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
        >
          <option value="">Todas las especies</option>
          {speciesList.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {isLoading && <div className="text-center py-10 text-slate-500 font-medium dark:text-slate-400">Cargando…</div>}
      {errorMessage && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium dark:bg-red-950/50 dark:border-red-800/40 dark:text-red-400">{errorMessage}</div>}
      {!isLoading && !errorMessage && pets.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 dark:bg-slate-900 dark:border-slate-700">
          <p className="text-slate-500 font-medium dark:text-slate-400">
            {species ? 'No hay mascotas disponibles de esta especie.' : 'No hay mascotas disponibles para adopción en este momento.'}
          </p>
        </div>
      )}
      {!isLoading && !errorMessage && pets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
        </div>
      )}
    </section>
  )
}