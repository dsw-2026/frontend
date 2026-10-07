import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../../../../api/httpClient'
import type { Publisher, PublisherInput } from '../../../../models/publisher'
import type { Locality } from '../../../../models/locality'
import { PublisherFormFields } from './PublisherFormFields'
import { publisherToFormValues } from './PublisherForm.data'
import { loadPublisherFormData, savePublisher } from './PublisherForm.server'

interface PublisherFormProps {
  // true cuando la pantalla se usa como registro público (/registro/publicador).
  // Cambia el título, el link de vuelta y a dónde va después de guardar:
  // quien se está registrando no tiene por qué terminar en el panel de gestión.
  registrationMode?: boolean
}

export function PublisherForm({ registrationMode = false }: PublisherFormProps) {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [publisher, setPublisher] = useState<Publisher | null>(null)
  const [localities, setLocalities] = useState<Locality[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false

    loadPublisherFormData(id ? Number(id) : undefined)
      .then(({ localities, publisher }) => {
        if (cancelled) return
        setLocalities(localities)
        setPublisher(publisher)
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

  async function handleSubmit(values: PublisherInput) {
    setSubmitting(true)
    setError(null)
    setFieldErrors({})
    try {
      await savePublisher(id ? Number(id) : undefined, values)
      navigate(registrationMode ? '/login' : '/publishers')
    } catch (err) {
      // Un 409 de conflicto de unicidad trae el campo que chocó: en ese caso
      // se marca el campo puntual en el formulario en vez de mostrar el
      // banner genérico de arriba.
      if (err instanceof ApiError && err.field) {
        setFieldErrors({ [err.field]: err.message })
      } else {
        setError(err instanceof ApiError ? err.message : 'No se pudo guardar el publicador')
      }
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to={registrationMode ? '/register' : '/publishers'} className="back-link">
        {registrationMode ? '← Volver' : '← Volver a publicadores'}
      </Link>
      <h1>
        {registrationMode ? 'Crear cuenta de publicador' : isEdit ? 'Editar publicador' : 'Nuevo publicador'}
      </h1>
      {error && <p className="error-message">{error}</p>}
      <PublisherFormFields
        initialValues={publisher ? publisherToFormValues(publisher) : undefined}
        localities={localities}
        isEdit={isEdit}
        onSubmit={handleSubmit}
        submitting={submitting}
        fieldErrors={fieldErrors}
      />
    </section>
  )
}