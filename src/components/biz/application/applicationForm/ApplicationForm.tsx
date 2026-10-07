import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ApiError } from '../../../../api/httpClient'
import type { ApplicationInput } from '../../../../models/application'
import type { Pet } from '../../../../models/pet'
import { ApplicationFormFields } from './ApplicationFormFields'
import { loadApplicationFormData, createApplication } from './ApplicationForm.server'

export function ApplicationForm() {
  const navigate = useNavigate()
  // ?pet=<id> llega desde /adopt → "Solicitar adopción": significa que la
  // mascota ya está elegida, no hace falta el <select> completo.
  const [searchParams] = useSearchParams()
  const petIdParam = searchParams.get('pet')

  const [fixedPet, setFixedPet] = useState<Pet | null>(null)
  const [availablePets, setAvailablePets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadApplicationFormData(petIdParam ? Number(petIdParam) : undefined)
      .then(({ fixedPet, availablePets }) => {
        if (cancelled) return
        setFixedPet(fixedPet)
        setAvailablePets(availablePets)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudo cargar la información necesaria')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [petIdParam])

  async function handleSubmit(values: ApplicationInput) {
    setSubmitting(true)
    setError(null)
    try {
      await createApplication(values)
      navigate('/applications')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo crear la solicitud')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  const noPets = !fixedPet && availablePets.length === 0

  return (
    <section>
      <Link to={petIdParam ? '/adopt' : '/applications'} className="back-link">
        {petIdParam ? '← Volver a mascotas en adopción' : '← Volver a solicitudes'}
      </Link>
      <h1>Nueva solicitud de adopción</h1>
      {error && <p className="error-message">{error}</p>}

      {noPets ? (
        <p className="empty-state">Todavía no hay ninguna mascota disponible para adoptar.</p>
      ) : (
        <ApplicationFormFields
          fixedPet={fixedPet ?? undefined}
          availablePets={availablePets}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </section>
  )
}