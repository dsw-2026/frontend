import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocality, useSaveLocality } from '../useLocalities'
import { LocalityForm } from '../components/LocalityForm'
import type { LocalityInput } from '../locality.model'
import { ApiError } from '@/shared/api/httpClient'

export function LocalityFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const { data: locality, isLoading, error: fetchError } = useLocality(id ? Number(id) : undefined)
  const saveLocality = useSaveLocality(id ? Number(id) : undefined)

  function handleSubmit(values: LocalityInput) {
    saveLocality.mutate(values, { onSuccess: () => navigate('/localities') })
  }

  if (isLoading) return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>

  const displayError = saveLocality.error || fetchError
  const errorMessage = displayError instanceof ApiError ? displayError.message : displayError ? 'Ocurrió un error al procesar la localidad' : null

  // Convierte la localidad cargada al formato del form (province como id).
  const initialValues: LocalityInput | undefined = locality
    ? { name: locality.name, postalCode: locality.postalCode, province: locality.province.id }
    : undefined

  return (
    <section className="space-y-6 p-6 max-w-4xl mx-auto">
      <Link to="/localities" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        ← Volver a localidades
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {isEdit ? 'Editar localidad' : 'Nueva localidad'}
      </h1>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">{errorMessage}</div>
      )}

      <LocalityForm initialValues={initialValues} onSubmit={handleSubmit} submitting={saveLocality.isPending} />
    </section>
  )
}