import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { publicadorService } from '../../services/publicador.service'
import { localidadService } from '../../services/localidad.service'
import type { Publicador, PublicadorInput } from '../../models/publicador'
import type { Localidad } from '../../models/localidad'
import { PublicadorForm } from './PublicadorForm'
import { ApiError } from '../../api/httpClient'

export function PublicadorFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [publicador, setPublicador] = useState<Publicador | null>(null)
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
        publicadorService.getById(Number(id)).then((data) => {
          if (!cancelado) setPublicador(data)
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

  async function handleSubmit(values: PublicadorInput) {
    setSubmitting(true)
    setError(null)
    setFieldErrors({})
    try {
      if (isEdit && id) {
        await publicadorService.update(Number(id), values)
      } else {
        await publicadorService.create(values)
      }
      navigate('/publicadores')
    } catch (err) {
      // Un 409 de conflicto de unicidad trae "field" (ver assertUnico en
      // el backend): en ese caso se marca el campo puntual en el
      // formulario en vez de mostrar el banner genérico de arriba.
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
      <Link to="/publicadores" className="back-link">
        ← Volver a publicadores
      </Link>
      <h1>{isEdit ? 'Editar publicador' : 'Nuevo publicador'}</h1>
      {error && <p className="error-message">{error}</p>}
      <PublicadorForm
        initialValues={
          publicador
            ? {
                nombreUsuario: publicador.nombreUsuario,
                nombre: publicador.nombre,
                apellido: publicador.apellido,
                email: publicador.email,
                telefono: publicador.telefono ?? '',
                descripcion: publicador.descripcion ?? '',
                direccion: publicador.direccion ?? '',
                fotoPerfil: publicador.fotoPerfil ?? '',
                localidadId: publicador.localidad?.id ?? '',
                verificacion: publicador.verificacion,
                tipo: publicador.tipo ?? '',
                sitioWeb: publicador.sitioWeb ?? '',
                horariosAtencion: publicador.horariosAtencion ?? '',
                instagram: publicador.redesSociales?.instagram ?? '',
                facebook: publicador.redesSociales?.facebook ?? '',
                whatsapp: publicador.redesSociales?.whatsapp ?? '',
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
