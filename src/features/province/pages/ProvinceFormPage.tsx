import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProvince, useSaveProvince } from '../useProvinces'
import { ProvinceForm } from '../components/ProvinceForm'
import { ApiError } from '@/shared/api/httpClient'

export function ProvinceFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const { data: province, isLoading, error: fetchError } = useProvince(id ? Number(id) : undefined)
  const saveProvince = useSaveProvince(id ? Number(id) : undefined)

  function handleSubmit(values: { name: string; code: string }) {
    saveProvince.mutate(values, {
      onSuccess: () => navigate('/provinces'),
    })
  }

  if (isLoading) {
    return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>
  }

  const displayError = saveProvince.error || fetchError
  const errorMessage = displayError instanceof ApiError ? displayError.message : displayError ? 'Ocurrió un error al procesar la provincia' : null

  return (
    <section className="space-y-6 p-6 max-w-4xl mx-auto">
      <Link to="/provinces" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        ← Volver a provincias
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {isEdit ? 'Editar provincia' : 'Nueva provincia'}
      </h1>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">
          {errorMessage}
        </div>
      )}

      <ProvinceForm initialValues={province} onSubmit={handleSubmit} submitting={saveProvince.isPending} />
    </section>
  )
}