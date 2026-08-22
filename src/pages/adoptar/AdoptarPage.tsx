import { useEffect, useState } from 'react'
import { mascotaService } from '../../services/mascota.service'
import type { Mascota } from '../../models/mascota'
import { MascotaCard } from './MascotaCard'
import { ApiError } from '../../api/httpClient'
import './MascotaCard.css'

export function AdoptarPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    mascotaService
      .getAll('DISPONIBLE')
      .then((data) => {
        if (!cancelado) setMascotas(data)
      })
      .catch((err) => {
        if (!cancelado) setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las mascotas')
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  return (
    <section>
      <div className="page-header">
        <h1>Mascotas en adopción</h1>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && mascotas.length === 0 && (
        <p className="empty-state">No hay mascotas disponibles para adopción en este momento.</p>
      )}
      {!loading && !error && mascotas.length > 0 && (
        <div className="mascotas-grid">
          {mascotas.map((mascota) => (
            <MascotaCard key={mascota.id} mascota={mascota} />
          ))}
        </div>
      )}
    </section>
  )
}
