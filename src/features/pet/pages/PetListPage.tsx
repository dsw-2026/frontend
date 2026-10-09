import { Link } from 'react-router-dom'
import { usePetList, useDeletePet } from '../usePets'
import { PetTable } from '../components/PetTable'
import { ApiError } from '@/shared/api/httpClient'
import { useAuth } from '@/shared/api/useAuth'

export function PetListPage() {
  const { user } = useAuth()
  const isPublisher = user?.userType === 'Publisher'

  const { data: pets = [], isLoading, error } = usePetList(
    isPublisher ? { publisher: user?.id } : {}
  )
  const deletePet = useDeletePet()

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

      {!isLoading && !errorMessage && (
        <PetTable pets={pets} showPublisher={!isPublisher} onDelete={handleDelete} />
      )}
    </section>
  )
}