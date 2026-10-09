import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSpecies, useSaveSpecies } from '../useSpecies'
import { SpeciesForm } from '../components/SpeciesForm'
import { ApiError } from '@/shared/api/httpClient'

export function SpeciesFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const { data: species, isLoading, error: fetchError } = useSpecies(id ? Number(id) : undefined)
  const saveSpecies = useSaveSpecies(id ? Number(id) : undefined)

  function handleSubmit(values: { name: string }) {
    saveSpecies.mutate(values, {
      onSuccess: () => navigate('/species'),
    })
  }

  if (isLoading) {
    return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>
  }

  const displayError = saveSpecies.error || fetchError
  const errorMessage = displayError instanceof ApiError ? displayError.message : displayError ? 'Ocurrió un error al procesar la especie' : null

  return (
    <section className="space-y-6 p-6 max-w-4xl mx-auto">
      <Link to="/species" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        ← Volver a especies
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {isEdit ? 'Editar especie' : 'Nueva especie'}
      </h1>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">
          {errorMessage}
        </div>
      )}

      <SpeciesForm initialValues={species} onSubmit={handleSubmit} submitting={saveSpecies.isPending} />
    </section>
  )
}