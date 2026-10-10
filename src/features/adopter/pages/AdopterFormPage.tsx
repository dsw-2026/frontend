import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAdopter, useSaveAdopter } from '../useAdopters'
import { AdopterForm } from '../components/AdopterForm'
import type { AdopterInput } from '../adopter.model'
import { ApiError } from '@/shared/api/httpClient'

interface AdopterFormPageProps {
  modoRegistro?: boolean
}

export function AdopterFormPage({ modoRegistro = false }: AdopterFormPageProps) {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const { data: adopter, isLoading, error: fetchError } = useAdopter(id ? Number(id) : undefined)
  const saveAdopter = useSaveAdopter(id ? Number(id) : undefined)

  function handleSubmit(values: AdopterInput) {
    saveAdopter.mutate(values, {
      onSuccess: () => navigate(modoRegistro ? '/login' : '/adopters'),
    })
  }

  if (isLoading) return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>

  const displayError = saveAdopter.error || fetchError
  const errorMessage = displayError instanceof ApiError ? displayError.message : displayError ? 'No se pudo guardar el adoptante' : null

  const initialValues = adopter
    ? {
        username: adopter.username,
        firstName: adopter.firstName,
        lastName: adopter.lastName,
        email: adopter.email,
        phone: adopter.phone ?? '',
        description: adopter.description ?? '',
        address: adopter.address ?? '',
        profilePhoto: adopter.profilePhoto ?? '',
        locality: adopter.locality?.id,
        verified: adopter.verified,
        occupation: adopter.occupation ?? '',
        housingType: adopter.housingType ?? '',
        hasYard: adopter.hasYard ?? false,
        hasOtherAnimals: adopter.hasOtherAnimals ?? false,
        otherAnimalsDetail: adopter.otherAnimalsDetail ?? '',
        hasChildren: adopter.hasChildren ?? false,
      }
    : undefined

  return (
    <section className="space-y-6 p-6 max-w-4xl mx-auto">
      <Link to={modoRegistro ? '/register' : '/adopters'} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        {modoRegistro ? '← Volver' : '← Volver a adoptantes'}
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {modoRegistro ? 'Crear cuenta de adoptante' : isEdit ? 'Editar adoptante' : 'Nuevo adoptante'}
      </h1>

      {errorMessage && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">{errorMessage}</div>}

      <AdopterForm initialValues={initialValues} isEdit={isEdit} onSubmit={handleSubmit} submitting={saveAdopter.isPending} />
    </section>
  )
}