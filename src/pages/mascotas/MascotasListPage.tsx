import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { mascotaService } from '../../services/mascota.service'
import type { Mascota } from '../../models/mascota'
import { MascotaTable } from './MascotaTable'
import { ApiError } from '../../api/httpClient'
import { useAuth } from '../../api/AuthContext'

export function MascotasListPage() {
  const { usuario } = useAuth()
  const esPublicador = usuario?.tipoUsuario === 'Publicador'
  const [mascotas, setMascotas] = useState<Mascota[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    // Un Publicador gestiona SOLO sus mascotas; el Admin las ve todas
    // (moderación de contenido).
    mascotaService
      .getAll(undefined, esPublicador ? usuario?.id : undefined)
      .then((data) => {
        if (!cancelado) setMascotas(data)
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las mascotas')
        }
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [esPublicador, usuario?.id])

  async function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta mascota?')) return
    try {
      await mascotaService.remove(id)
      setMascotas((prev) => prev.filter((mascota) => mascota.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la mascota')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Mascotas</h1>
        {/* El alta es solo para Publicador: el backend rechaza el POST de
            cualquier otro rol (verificarTipo('Publicador')). */}
        {esPublicador && (
          <Link to="/mascotas/nueva" className="btn btn-primary">
            + Nueva mascota
          </Link>
        )}
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <MascotaTable
          mascotas={mascotas}
          mostrarPublicador={!esPublicador}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}