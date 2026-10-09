import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { usePet, usePetList } from '@/features/pet/usePets'
import { useCreateApplication } from '../useApplications'
import { ApplicationForm } from '../components/ApplicationForm'
import type { ApplicationInput } from '../application.model'
import { ApiError } from '@/shared/api/httpClient'

export function ApplicationFormPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const petIdParam = searchParams.get('pet')

  // Si viene ?pet=<id>, traigo esa mascota; si no, la lista de disponibles.
  const { data: fixedPet, isLoading: loadingPet } = usePet(petIdParam ? Number(petIdParam) : undefined)
  const { data: availablePets = [], isLoading: loadingList } = usePetList(
    petIdParam ? {} : { status: 'AVAILABLE' }
  )
  const createApplication = useCreateApplication()

  function handleSubmit(values: ApplicationInput) {
    createApplication.mutate(values, { onSuccess: () => navigate('/applications') })
  }

  if ((petIdParam && loadingPet) || (!petIdParam && loadingList)) {
    return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>
  }

  const errorMessage = createApplication.error instanceof ApiError ? createApplication.error.message : createApplication.error ? 'No se pudo crear la solicitud' : null

  return (
    <section className="space-y-6 p-6 max-w-3xl mx-auto">
      <Link to={petIdParam ? '/adopt' : '/applications'} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        {petIdParam ? '← Volver a mascotas en adopción' : '← Volver a solicitudes'}
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nueva solicitud de adopción</h1>

      {errorMessage && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">{errorMessage}</div>}

      <ApplicationForm
        fixedPet={fixedPet}
        availablePets={availablePets}
        onSubmit={handleSubmit}
        submitting={createApplication.isPending}
      />
    </section>
  )
}