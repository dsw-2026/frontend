import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { provinciaService } from '../../services/provincia.service'
import type { Provincia, ProvinciaInput } from '../../models/provincia'
import { ProvinciaForm } from './ProvinciaForm'
import { ApiError } from '../../api/httpClient'

export function ProvinciaFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [provincia, setProvincia] = useState<Provincia | null>(null)
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    provinciaService
      .getById(Number(id))
      .then(setProvincia)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'No se pudo cargar la provincia'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(values: ProvinciaInput) {
    setSubmitting(true)
    setError(null)
    try {
      if (isEdit && id) {
        await provinciaService.update(Number(id), values)
      } else {
        await provinciaService.create(values)
      }
      navigate('/provincias')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la provincia')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to="/provincias" className="back-link">
        ← Volver a provincias
      </Link>
      <h1>{isEdit ? 'Editar provincia' : 'Nueva provincia'}</h1>
      {error && <p className="error-message">{error}</p>}
      <ProvinciaForm initialValues={provincia ?? undefined} onSubmit={handleSubmit} submitting={submitting} />
    </section>
  )
}
