import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { solicitudService } from '../../services/solicitud.service'
import { mascotaService } from '../../services/mascota.service'
import type { SolicitudInput } from '../../models/solicitud'
import type { Mascota } from '../../models/mascota'
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
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    // Acá NO se piden los adoptantes: quién solicita lo resuelve el backend
    // desde el token (ver solicitud.controller.ts). Además el listado
    // completo de adoptantes es solo para Admin, así que pedirlo rompía la
    // pantalla con un 403 justo para el único rol que puede solicitar.
    const pedido = mascotaIdParam
      ? // Ya sabemos cuál mascota es: solo hace falta traer esa.
        mascotaService.getById(Number(mascotaIdParam)).then((data) => {
          if (!cancelado) setMascotaFija(data)
        })
      : // Acceso directo al formulario: se ofrece el <select> con todas
        // las disponibles.
        mascotaService.getAll('DISPONIBLE').then((data) => {
          if (!cancelado) setMascotasDisponibles(data)
        })

    pedido
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

  const sinMascotas = !mascotaFija && mascotasDisponibles.length === 0

  return (
    <section>
      <Link to={mascotaIdParam ? '/adoptar' : '/solicitudes'} className="back-link">
        {mascotaIdParam ? '← Volver a mascotas en adopción' : '← Volver a solicitudes'}
      </Link>
      <h1>Nueva solicitud de adopción</h1>
      {error && <p className="error-message">{error}</p>}

      {sinMascotas ? (
        <p className="empty-state">
          Todavía no hay ninguna mascota disponible para adoptar.
        </p>
      ) : (
        <SolicitudForm
          mascotaFija={mascotaFija ?? undefined}
          mascotasDisponibles={mascotasDisponibles}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </section>
  )
}