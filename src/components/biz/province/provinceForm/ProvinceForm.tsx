import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/button/Button'
import { ApiError } from '../../../../api/httpClient'
import { loadProvince, saveProvince } from './ProvinceForm.server'

export function ProvinceForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    loadProvince(Number(id))
      .then((province) => {
        setName(province.name)
        setCode(province.code)
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : 'No se pudo cargar la provincia'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      // El backend guarda el código tal cual se lo mandemos; lo normalizamos acá
      // a mayúsculas para que "cba" y "CBA" no generen entradas distintas
      // y choquen contra el unique: true de la entidad sin que el usuario
      // entienda por qué.
      await saveProvince(id ? Number(id) : undefined, {
        name: name.trim(),
        code: code.trim().toUpperCase(),
      })
      navigate('/provinces')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la provincia')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to="/provinces" className="back-link">
        ← Volver a provincias
      </Link>
      <h1>{isEdit ? 'Editar provincia' : 'Nueva provincia'}</h1>
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
            placeholder="Ej: Córdoba"
            autoFocus
          />
        </label>

        <label className="form-field">
          <span>Código</span>
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
            minLength={2}
            maxLength={4}
            placeholder="Ej: CBA"
          />
        </label>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : 'Guardar'}
        </Button>
      </form>
    </section>
  )
}