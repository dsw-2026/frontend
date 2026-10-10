import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePublisher, useSavePublisher } from '../usePublishers'
import { PublisherForm } from '../components/PublisherForm'
import type { PublisherInput } from '../publisher.model'
import { ApiError } from '@/shared/api/httpClient'

interface PublisherFormPageProps {
  modoRegistro?: boolean
}

export function PublisherFormPage({ modoRegistro = false }: PublisherFormPageProps) {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const { data: publisher, isLoading, error: fetchError } = usePublisher(id ? Number(id) : undefined)
  const savePublisher = useSavePublisher(id ? Number(id) : undefined)

  function handleSubmit(values: PublisherInput) {
    savePublisher.mutate(values, {
      onSuccess: () => navigate(modoRegistro ? '/login' : '/publishers'),
    })
  }

  if (isLoading) return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>

  const displayError = savePublisher.error || fetchError
  const errorMessage = displayError instanceof ApiError ? displayError.message : displayError ? 'No se pudo guardar el publicador' : null

  const initialValues = publisher
    ? {
        username: publisher.username,
        firstName: publisher.firstName,
        lastName: publisher.lastName,
        email: publisher.email,
        phone: publisher.phone ?? '',
        description: publisher.description ?? '',
        address: publisher.address ?? '',
        profilePhoto: publisher.profilePhoto ?? '',
        locality: publisher.locality?.id,
        verified: publisher.verified,
        type: publisher.type ?? '',
        website: publisher.website ?? '',
        openingHours: publisher.openingHours ?? '',
        instagram: publisher.socialMedia?.instagram ?? '',
        facebook: publisher.socialMedia?.facebook ?? '',
        whatsapp: publisher.socialMedia?.whatsapp ?? '',
      }
    : undefined

  return (
    <section className="space-y-6 p-6 max-w-4xl mx-auto">
      <Link to={modoRegistro ? '/register' : '/publishers'} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        {modoRegistro ? '← Volver' : '← Volver a publicadores'}
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {modoRegistro ? 'Crear cuenta de publicador' : isEdit ? 'Editar publicador' : 'Nuevo publicador'}
      </h1>

      {errorMessage && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">{errorMessage}</div>}

      <PublisherForm initialValues={initialValues} isEdit={isEdit} onSubmit={handleSubmit} submitting={savePublisher.isPending} />
    </section>
  )
}