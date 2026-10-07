// ApplicationList.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Application } from '../../../../models/application'
import { ApiError } from '../../../../api/httpClient'
import { useAuth } from '../../../../api/AuthContext'
import { ApplicationTable } from '../applicationTable/ApplicationTable'
import {
  loadApplications,
  approveApplication,
  rejectApplication,
  deleteApplication,
} from './ApplicationList.server'

export function ApplicationList() {
  const { user } = useAuth()
  const isAdopter = user?.userType === 'Adopter'
  const isPublisher = user?.userType === 'Publisher'
  const isAdmin = user?.userType === 'Admin'
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function reloadApplications() {
    return loadApplications().then(setApplications)
  }

  useEffect(() => {
    let cancelled = false

    reloadApplications()
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las solicitudes')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleApprove(id: number) {
    try {
      await approveApplication(id)
      await reloadApplications()
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo aprobar la solicitud')
    }
  }

  async function handleReject(id: number) {
    try {
      await rejectApplication(id)
      await reloadApplications()
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo rechazar la solicitud')
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta solicitud?')) return
    try {
      await deleteApplication(id)
      setApplications((prev) => prev.filter((application) => application.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la solicitud')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Solicitudes</h1>
        {isAdopter && (
          <Link to="/applications/new" className="btn btn-primary">
            + Nueva solicitud
          </Link>
        )}
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <ApplicationTable
          applications={applications}
          canResolve={isPublisher}
          canDelete={!isAdmin}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}