import { usePetList } from '../usePets'
import { PetCard } from '../components/PetCard'
import { ApiError } from '@/shared/api/httpClient'

export function AdoptPage() {
  const { data: pets = [], isLoading, error } = usePetList({ status: 'AVAILABLE' })

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar las mascotas' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mascotas en adopción</h1>
        <p className="text-sm text-slate-500 mt-1">Encontrá a tu próximo compañero.</p>
      </div>

      {isLoading && <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>}
      {errorMessage && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">{errorMessage}</div>}
      {!isLoading && !errorMessage && pets.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">No hay mascotas disponibles para adopción en este momento.</p>
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