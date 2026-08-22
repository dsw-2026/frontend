import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { mascotaService } from '../../services/mascota.service'
import { especieService } from '../../services/especie.service'
import { publicadorService } from '../../services/publicador.service'
import type { Mascota, MascotaInput } from '../../models/mascota'
import type { Especie } from '../../models/especie'
import type { Publicador } from '../../models/publicador'
import { MascotaForm } from './MascotaForm'
import { ApiError } from '../../api/httpClient'

export function MascotaFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [mascota, setMascota] = useState<Mascota | null>(null)
  const [especies, setEspecies] = useState<Especie[]>([])
  const [publicadores, setPublicadores] = useState<Publicador[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    // Especie y Publicador hacen falta siempre (son los <select>); la
    // Mascota puntual solo si estamos editando. Las 2 o 3 en paralelo.
    const pedidos: Promise<unknown>[] = [
      especieService.getAll().then((data) => {
        if (!cancelado) setEspecies(data)
      }),
      publicadorService.getAll().then((data) => {
        if (!cancelado) setPublicadores(data)
      }),
    ]
    if (id) {
      pedidos.push(
        mascotaService.getById(Number(id)).then((data) => {
          if (!cancelado) setMascota(data)
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

  async function handleSubmit(values: MascotaInput) {
    setSubmitting(true)
    setError(null)
    try {
      if (isEdit && id) {
        await mascotaService.update(Number(id), values)
      } else {
        await mascotaService.create(values)
      }
      navigate('/mascotas')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la mascota')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  // Sin Especie o sin Publicador, los <select> quedarían vacíos e
  // inutilizables — mejor cortar acá con un mensaje claro que mandar a
  // la persona a resolver la causa real, en vez de un formulario roto.
  const faltantes: string[] = []
  if (especies.length === 0) faltantes.push('una especie')
  if (publicadores.length === 0) faltantes.push('un publicador')

  return (
    <section>
      <Link to="/mascotas" className="back-link">
        ← Volver a mascotas
      </Link>
      <h1>{isEdit ? 'Editar mascota' : 'Nueva mascota'}</h1>
      {error && <p className="error-message">{error}</p>}

      {faltantes.length > 0 ? (
        <p className="empty-state">
          Todavía no hay {faltantes.join(' ni ')} cargado{faltantes.length > 1 ? 's' : ''}. Creá{' '}
          {faltantes.length > 1 ? 'ambos' : 'eso'} primero para poder cargar una mascota.
        </p>
      ) : (
        <MascotaForm
          initialValues={
            mascota
              ? {
                  nombre: mascota.nombre,
                  sexo: mascota.sexo,
                  edad: mascota.edad,
                  unidadEdad: mascota.unidadEdad,
                  estado: mascota.estado,
                  foto: mascota.foto ?? '',
                  especieId: mascota.especie.id,
                  publicadorId: mascota.publicador.id,
                  energia: mascota.caracteristica.energia,
                  caracter: mascota.caracteristica.caracter,
                  tamanio: mascota.caracteristica.tamanio,
                  vacunacion: mascota.caracteristica.vacunacion,
                  castracion: mascota.caracteristica.castracion,
                  toleraNinos: mascota.caracteristica.toleraNinos,
                  toleraAnimales: mascota.caracteristica.toleraAnimales,
                  toleraEncierro: mascota.caracteristica.toleraEncierro,
                  observacionesAdicionales: mascota.caracteristica.observacionesAdicionales ?? '',
                }
              : undefined
          }
          especies={especies}
          publicadores={publicadores}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </section>
  )
}
