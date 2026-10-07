import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/button/Button'
import { ApiError } from '../../../../api/httpClient'
import { loadSpecies, saveSpecies } from './SpeciesForm.server'

export function SpeciesForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    loadSpecies(Number(id))
      .then((species) => setName(species.name))
      .catch((err) => setError(err instanceof ApiError ? err.message : 'No se pudo cargar la especie'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await saveSpecies(id ? Number(id) : undefined, { name: name.trim() })
      navigate('/species') 
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la especie')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to="/species" className="back-link"> 
        ← Volver a especies
      </Link>
      <h1>{isEdit ? 'Editar especie' : 'Nueva especie'}</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label className="form-field">
          <span>Nombre</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={2}
            placeholder="Ej: Perro"
            autoFocus
          />
        </label>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : 'Guardar'}
        </Button>
      </form>
    </section>
  )
}