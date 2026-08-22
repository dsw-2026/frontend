import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { solicitudService } from '../../services/solicitud.service'
import { mascotaService } from '../../services/mascota.service'
import { adoptanteService } from '../../services/adoptante.service'
import type { SolicitudInput } from '../../models/solicitud'
import type { Mascota } from '../../models/mascota'
import type { Adoptante } from '../../models/adoptante'
import { SolicitudForm } from './SolicitudForm'
import { ApiError } from '../../api/httpClient'

export function SolicitudFormPage() {
  const navigate = useNavigate()
  // ?mascota=<id> llega desde /adoptar → "Solicitar adopción": significa
  // que la mascota ya está elegida, no hace falta el <select> completo.
  const [searchParams] = useSearchParams()
  const mascotaIdParam = searchParams.get('mascota')

  const [mascotaFija, setMascotaFija] = useState<Mascota | null>(null)
  const [mascotasDisponibles, setMascotasDisponibles] = useState<Mascota[]>([])
  const [adoptantes, setAdoptantes] = useState<Adoptante[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    const pedidos: Promise<unknown>[] = [
      adoptanteService.getAll().then((data) => {
        if (!cancelado) setAdoptantes(data)
      }),
    ]

    if (mascotaIdParam) {
      // Ya sabemos cuál mascota es: solo hace falta traer esa, no la
      // lista completa de disponibles.
      pedidos.push(
        mascotaService.getById(Number(mascotaIdParam)).then((data) => {
          if (!cancelado) setMascotaFija(data)
        })
      )
    } else {
      // Acceso directo al formulario (ej: desde el panel interno): se
      // ofrece el <select> con todas las disponibles, como antes.
      pedidos.push(
        mascotaService.getAll('DISPONIBLE').then((data) => {
          if (!cancelado) setMascotasDisponibles(data)
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
  }, [mascotaIdParam])

  async function handleSubmit(values: SolicitudInput) {
    setSubmitting(true)
    setError(null)
    try {
      await solicitudService.create(values)
      navigate('/solicitudes')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo crear la solicitud')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  const faltantes: string[] = []
  if (!mascotaFija && mascotasDisponibles.length === 0) faltantes.push('ninguna mascota disponible')
  if (adoptantes.length === 0) faltantes.push('ningún adoptante')

  return (
    <section>
      <Link to={mascotaIdParam ? '/adoptar' : '/solicitudes'} className="back-link">
        {mascotaIdParam ? '← Volver a mascotas en adopción' : '← Volver a solicitudes'}
      </Link>
      <h1>Nueva solicitud de adopción</h1>
      {error && <p className="error-message">{error}</p>}

      {faltantes.length > 0 ? (
        <p className="empty-state">
          Todavía no hay {faltantes.join(' ni ')}. Hace falta al menos una mascota disponible y un adoptante
          cargado para poder generar una solicitud.
        </p>
      ) : (
        <SolicitudForm
          mascotaFija={mascotaFija ?? undefined}
          mascotasDisponibles={mascotasDisponibles}
          adoptantes={adoptantes}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </section>
  )
}
