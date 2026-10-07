import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/button/Button'
import { ApiError } from '../../../../api/httpClient'
import type { Province } from '../../../../models/province'
import { loadLocalityFormData, saveLocality } from './LocalityForm.server'

export function LocalityForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [provinces, setProvinces] = useState<Province[]>([])
  const [name, setName] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [provinceId, setProvinceId] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadLocalityFormData(id ? Number(id) : undefined)
      .then(({ provinces, locality }) => {
        if (cancelled) return
        setProvinces(provinces)
        if (locality) {
          setName(locality.name)
          setPostalCode(locality.postalCode)
          setProvinceId(String(locality.province.id))
        }
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await saveLocality(id ? Number(id) : undefined, {
        name: name.trim(),
        postalCode: postalCode.trim(),
        province: Number(provinceId),
      })
      navigate('/localities')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la localidad')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to="/localities" className="back-link">
        ← Volver a localidades
      </Link>
      <h1>{isEdit ? 'Editar localidad' : 'Nueva localidad'}</h1>
      {error && <p className="error-message">{error}</p>}

      {provinces.length === 0 ? (
        <p className="empty-state">
          Todavía no hay ninguna provincia cargada. <Link to="/provinces/new">Creá una primero</Link> para poder
          asignarle una localidad.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <label className="form-field">
            <span>Nombre</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              placeholder="Ej: Rosario"
              autoFocus
            />
          </label>

          <label className="form-field">
            <span>Código postal</span>
            <input
              type="text"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
              placeholder="Ej: 2000"
            />
          </label>

          <label className="form-field">
            <span>Provincia</span>
            <select value={provinceId} onChange={(event) => setProvinceId(event.target.value)} required>
              <option value="" disabled>
                Seleccioná una provincia
              </option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </label>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Guardando…' : 'Guardar'}
          </Button>
        </form>
      )}
    </section>
  )
}