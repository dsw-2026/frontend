import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../../../../api/httpClient'
import type { Adopter, AdopterInput } from '../../../../models/adopter'
import type { Locality } from '../../../../models/locality'
import { AdopterFormFields } from './AdopterFormFields'
import { adopterToFormValues } from './AdopterForm.data'
import { loadAdopterFormData, saveAdopter } from './AdopterForm.server'

interface AdopterFormProps {
  // true cuando la pantalla se usa como registro público (/register/adopter).
  // Cambia el título, el link de vuelta y a dónde va después de guardar:
  // quien se está registrando no tiene por qué terminar en el panel de gestión.
  registrationMode?: boolean
}

export function AdopterForm({ registrationMode = false }: AdopterFormProps) {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [adopter, setAdopter] = useState<Adopter | null>(null)
  const [localities, setLocalities] = useState<Locality[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false

    loadAdopterFormData(id ? Number(id) : undefined)
      .then(({ localities, adopter }) => {
        if (cancelled) return
        setLocalities(localities)
        setAdopter(adopter)
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
  }, [id])

  async function handleSubmit(values: AdopterInput) {
    setSubmitting(true)
    setError(null)
    setFieldErrors({})
    try {
      await saveAdopter(id ? Number(id) : undefined, values)
      // Registrarse no deja sesión iniciada (el alta no devuelve token),
      // así que el paso siguiente es loguearse con la cuenta recién creada.
      navigate(registrationMode ? '/login' : '/adopters')
    } catch (err) {
      if (err instanceof ApiError && err.field) {
        setFieldErrors({ [err.field]: err.message })
      } else {
        setError(err instanceof ApiError ? err.message : 'No se pudo guardar el adoptante')
      }
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to={registrationMode ? '/register' : '/adopters'} className="back-link">
        {registrationMode ? '← Volver' : '← Volver a adoptantes'}
      </Link>
      <h1>{registrationMode ? 'Crear cuenta de adoptante' : isEdit ? 'Editar adoptante' : 'Nuevo adoptante'}</h1>
      {error && <p className="error-message">{error}</p>}
      <AdopterFormFields
        initialValues={adopter ? adopterToFormValues(adopter) : undefined}
        localities={localities}
        isEdit={isEdit}
        onSubmit={handleSubmit}
        submitting={submitting}
        fieldErrors={fieldErrors}
      />
    </section>
  )
}