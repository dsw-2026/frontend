import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { localidadService } from '../../services/localidad.service'
import { provinciaService } from '../../services/provincia.service'
import type { Localidad, LocalidadInput } from '../../models/localidad'
import type { Provincia } from '../../models/provincia'
import { LocalidadForm } from './LocalidadForm'
import { ApiError } from '../../api/httpClient'

export function LocalidadFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [localidad, setLocalidad] = useState<Localidad | null>(null)
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    // Siempre hace falta la lista de provincias (para el <select>). La
    // localidad puntual solo si estamos editando. Se piden en paralelo,
    // no una después de la otra, para no hacer esperar al usuario el
    // doble de tiempo sin necesidad.
    const pedidos: Promise<unknown>[] = [
      provinciaService.getAll().then((data) => {
        if (!cancelado) setProvincias(data)
      }),
    ]
    if (id) {
      pedidos.push(
        localidadService.getById(Number(id)).then((data) => {
          if (!cancelado) setLocalidad(data)
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

  async function handleSubmit(values: LocalidadInput) {
    setSubmitting(true)
    setError(null)
    try {
      if (isEdit && id) {
        await localidadService.update(Number(id), values)
      } else {
        await localidadService.create(values)
      }
      navigate('/localidades')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la localidad')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to="/localidades" className="back-link">
        ← Volver a localidades
      </Link>
      <h1>{isEdit ? 'Editar localidad' : 'Nueva localidad'}</h1>
      {error && <p className="error-message">{error}</p>}

      {provincias.length === 0 ? (
        // Sin esto, LocalidadForm renderizaría un <select> vacío e
        // inutilizable, sin explicar por qué. Mejor cortar acá con un
        // mensaje claro y mandar a la persona a resolver la causa real.
        <p className="empty-state">
          Todavía no hay ninguna provincia cargada. <Link to="/provincias/nueva">Creá una primero</Link> para poder
          asignarle una localidad.
        </p>
      ) : (
        <LocalidadForm
          initialValues={
            localidad
              ? { nombre: localidad.nombre, codigoPostal: localidad.codigoPostal, provinciaId: localidad.provincia.id }
              : undefined
          }
          provincias={provincias}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </section>
  )
}
