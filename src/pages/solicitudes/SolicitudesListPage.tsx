import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { solicitudService } from '../../services/solicitud.service'
import type { Solicitud } from '../../models/solicitud'
import { SolicitudTable } from './SolicitudTable'
import { ApiError } from '../../api/httpClient'
import { useAuth } from '../../api/AuthContext'

export function SolicitudesListPage() {
  const { usuario } = useAuth()
  // Quién puede hacer qué, según lo que valida el backend:
  // - crear solicitudes: solo Adoptante
  // - aprobar/rechazar: solo el Publicador dueño de la mascota
  // - eliminar: Adoptante y Publicador (el Admin es de solo lectura acá)
  const esAdoptante = usuario?.tipoUsuario === 'Adoptante'
  const esPublicador = usuario?.tipoUsuario === 'Publicador'
  const esAdmin = usuario?.tipoUsuario === 'Admin'
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function cargarSolicitudes() {
    return solicitudService.getAll().then(setSolicitudes)
  }

  useEffect(() => {
    let cancelado = false

    cargarSolicitudes()
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las solicitudes')
        }
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  // Aprobar/rechazar recargan la lista COMPLETA en vez de actualizar solo
  // la fila tocada: aprobar rechaza en cascada las demás solicitudes
  // PENDIENTE de la misma mascota (ver Epic B en el backend), así que
  // más de una fila puede cambiar de estado con una sola acción.
  async function handleAprobar(id: number) {
    try {
      await solicitudService.aprobar(id)
      await cargarSolicitudes()
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo aprobar la solicitud')
    }
  }

  async function handleRechazar(id: number) {
    try {
      await solicitudService.rechazar(id)
      await cargarSolicitudes()
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo rechazar la solicitud')
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta solicitud?')) return
    try {
      await solicitudService.remove(id)
      setSolicitudes((prev) => prev.filter((solicitud) => solicitud.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la solicitud')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Solicitudes</h1>
        {esAdoptante && (
          <Link to="/solicitudes/nueva" className="btn btn-primary">
            + Nueva solicitud
          </Link>
        )}
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <SolicitudTable
          solicitudes={solicitudes}
          puedeResolver={esPublicador}
          puedeEliminar={!esAdmin}
          onAprobar={handleAprobar}
          onRechazar={handleRechazar}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}
