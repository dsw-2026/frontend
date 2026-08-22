import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { especieService } from '../../services/especie.service'
import type { Especie, EspecieInput } from '../../models/especie'
import { EspecieForm } from './EspecieForm'
import { ApiError } from '../../api/httpClient'

// Una sola página cubre "crear" y "editar": si hay :id en la ruta
// (/especies/:id/editar), carga esa especie primero; si no
// (/especies/nueva), arranca en blanco.
export function EspecieFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [especie, setEspecie] = useState<Especie | null>(null)
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    especieService
      .getById(Number(id))
      .then(setEspecie)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'No se pudo cargar la especie'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(values: EspecieInput) {
    setSubmitting(true)
    setError(null)
    try {
      if (isEdit && id) {
        await especieService.update(Number(id), values)
      } else {
        await especieService.create(values)
      }
      navigate('/especies')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la especie')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to="/especies" className="back-link">
        ← Volver a especies
      </Link>
      <h1>{isEdit ? 'Editar especie' : 'Nueva especie'}</h1>
      {error && <p className="error-message">{error}</p>}
      <EspecieForm initialValues={especie ?? undefined} onSubmit={handleSubmit} submitting={submitting} />
    </section>
  )
}
