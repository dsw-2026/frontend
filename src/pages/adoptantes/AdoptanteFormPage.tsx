import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adoptanteService } from '../../services/adoptante.service'
import { localidadService } from '../../services/localidad.service'
import type { Adoptante, AdoptanteInput } from '../../models/adoptante'
import type { Localidad } from '../../models/localidad'
import { AdoptanteForm } from './AdoptanteForm'
import { ApiError } from '../../api/httpClient'

export function AdoptanteFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [adoptante, setAdoptante] = useState<Adoptante | null>(null)
  const [localidades, setLocalidades] = useState<Localidad[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelado = false

    const pedidos: Promise<unknown>[] = [
      localidadService.getAll().then((data) => {
        if (!cancelado) setLocalidades(data)
      }),
    ]
    if (id) {
      pedidos.push(
        adoptanteService.getById(Number(id)).then((data) => {
          if (!cancelado) setAdoptante(data)
        })
      )
    }

    Promise.all(pedidos)
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudo cargar la información necesaria')
        }
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [id])

  async function handleSubmit(values: AdoptanteInput) {
    setSubmitting(true)
    setError(null)
    setFieldErrors({})
    try {
      if (isEdit && id) {
        await adoptanteService.update(Number(id), values)
      } else {
        await adoptanteService.create(values)
      }
      navigate('/adoptantes')
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
      <Link to="/adoptantes" className="back-link">
        ← Volver a adoptantes
      </Link>
      <h1>{isEdit ? 'Editar adoptante' : 'Nuevo adoptante'}</h1>
      {error && <p className="error-message">{error}</p>}
      <AdoptanteForm
        initialValues={
          adoptante
            ? {
                nombreUsuario: adoptante.nombreUsuario,
                nombre: adoptante.nombre,
                apellido: adoptante.apellido,
                email: adoptante.email,
                telefono: adoptante.telefono ?? '',
                descripcion: adoptante.descripcion ?? '',
                direccion: adoptante.direccion ?? '',
                fotoPerfil: adoptante.fotoPerfil ?? '',
                localidadId: adoptante.localidad?.id ?? '',
                verificacion: adoptante.verificacion,
                occupation: adoptante.occupation ?? '',
                tipoVivienda: adoptante.tipoVivienda ?? '',
              }
            : undefined
        }
        localidades={localidades}
        isEdit={isEdit}
        onSubmit={handleSubmit}
        submitting={submitting}
        fieldErrors={fieldErrors}
      />
    </section>
  )
}
