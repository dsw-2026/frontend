import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ApplicationStatus, type Application } from '../../../../models/application.ts'
import { AvatarZoom } from '../../../shared/ui/avatarZoom/AvatarZoom.tsx'
import { Button } from '../../../shared/ui/button/Button.tsx'
import { ApiError } from '../../../../api/httpClient.ts'
import { useAuth } from '../../../../api/AuthContext.tsx'
import {
  SEX_LABELS,
  AGE_UNIT_LABELS,
  SIZE_LABELS,
  ENERGY_LEVEL_LABELS,
  TOLERANCE_LABELS,
} from '../../pet/petForm/PetForm.data.ts'
import { HOUSING_TYPE_LABELS } from '../../adopter/adopterForm/AdopterForm.data.ts'
import { calculateBreakdown, totalCompatibility } from '../compatibility/compatibility.ts'
import { loadApplication, approveApplication, rejectApplication } from './ApplicationDetails.server.ts'

export function ApplicationDetails() {
  const { user } = useAuth()
  const isPublisher = user?.userType === 'Publisher'
  const { id } = useParams()
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [acting, setActing] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    loadApplication(Number(id))
      .then((data) => {
        if (!cancelled) setApplication(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'No se pudo cargar la solicitud')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  async function handleApprove() {
    if (!application) return
    setActing(true)
    try {
      setApplication(await approveApplication(application.id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo aprobar la solicitud')
    } finally {
      setActing(false)
    }
  }

  async function handleReject() {
    if (!application) return
    setActing(true)
    try {
      setApplication(await rejectApplication(application.id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo rechazar la solicitud')
    } finally {
      setActing(false)
    }
  }

  if (loading) return <p>Cargando…</p>
  if (error) return <p className="error-message">{error}</p>
  if (!application) return null

  const { pet, adopter } = application
  const breakdown = calculateBreakdown(application)
  const { points, total, percentage } = totalCompatibility(breakdown)

  return (
    <section>
      <Link to="/applications" className="back-link">
        ← Volver a solicitudes
      </Link>
      <h1>Detalle de la solicitud</h1>

      <div className="comparison-grid">
        <div className="comparison-card">
          <AvatarZoom
            src={adopter.profilePhoto}
            alt={`${adopter.firstName} ${adopter.lastName}`}
            fallbackText={adopter.firstName.charAt(0).toUpperCase()}
          />
          <h2>
            {adopter.firstName} {adopter.lastName}
          </h2>
          <p className="comparison-subtitle">Adoptante</p>
          <ul className="comparison-facts">
            <li>
              <strong>Email:</strong> {adopter.email}
            </li>
            {adopter.phone && (
              <li>
                <strong>Teléfono:</strong> {adopter.phone}
              </li>
            )}
            {adopter.address && (
              <li>
                <strong>Dirección:</strong> {adopter.address}
              </li>
            )}
            {typeof adopter.locality === 'object' && adopter.locality?.province && (
              <li>
                <strong>Localidad:</strong> {adopter.locality.name} ({adopter.locality.province.name})
              </li>
            )}
            {adopter.occupation && (
              <li>
                <strong>Ocupación:</strong> {adopter.occupation}
              </li>
            )}
            {adopter.housingType && (
              <li>
                <strong>Vivienda:</strong> {HOUSING_TYPE_LABELS[adopter.housingType]}
              </li>
            )}
            {adopter.description && (
              <li>
                <strong>Descripción:</strong> {adopter.description}
              </li>
            )}
          </ul>
        </div>

        <div className="comparison-card">
          <AvatarZoom src={pet.photo} alt={pet.name} fallbackText={pet.name.charAt(0).toUpperCase()} />
          <h2>{pet.name}</h2>
          <p className="comparison-subtitle">
            {pet.species.name} · Publicado por {pet.publisher.firstName} {pet.publisher.lastName}
          </p>
          <ul className="comparison-facts">
            <li>
              <strong>Sexo:</strong> {SEX_LABELS[pet.sex]}
            </li>
            <li>
              <strong>Edad:</strong> {pet.age} {AGE_UNIT_LABELS[pet.ageUnit].toLowerCase()}
            </li>
            <li>
              <strong>Tamaño:</strong> {SIZE_LABELS[pet.characteristic.size]}
            </li>
            <li>
              <strong>Energía:</strong> {ENERGY_LEVEL_LABELS[pet.characteristic.energyLevel]}
            </li>
            <li>
              <strong>Carácter:</strong> {pet.characteristic.temperament}
            </li>
            <li>
              <strong>Vacunado:</strong> {pet.characteristic.vaccinated ? 'Sí' : 'No'}
            </li>
            <li>
              <strong>Castrado:</strong> {pet.characteristic.neutered ? 'Sí' : 'No'}
            </li>
            <li>
              <strong>Tolera niños:</strong> {TOLERANCE_LABELS[pet.characteristic.toleratesChildren]}
            </li>
            <li>
              <strong>Tolera otros animales:</strong> {TOLERANCE_LABELS[pet.characteristic.toleratesOtherAnimals]}
            </li>
            <li>
              <strong>Tolera el encierro:</strong> {TOLERANCE_LABELS[pet.characteristic.toleratesConfinement]}
            </li>
            {pet.characteristic.additionalNotes && (
              <li>
                <strong>Observaciones:</strong> {pet.characteristic.additionalNotes}
              </li>
            )}
          </ul>
        </div>
      </div>

      <h2 className="form-section-title">Compatibilidad</h2>
      <p>
        <strong>
          {points} de {total} ({percentage}%)
        </strong>{' '}
        — coincidencias entre lo que busca el Adoptante y las características reales de la Mascota, calculado en el
        momento.
      </p>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>Mascota</th>
              <th>Adoptante</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((item) => (
              <tr key={item.factor}>
                <td>{item.factor}</td>
                <td>{item.petDetail}</td>
                <td>{item.adopterDetail}</td>
                <td>
                  {item.compatible ? (
                    <span className="compat-icon compat-yes">✓ Coincide</span>
                  ) : (
                    <span className="compat-icon compat-no">✗ No coincide</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {application.message && (
        <>
          <h2 className="form-section-title">Mensaje del adoptante</h2>
          <p>{application.message}</p>
        </>
      )}

      {isPublisher && application.status === ApplicationStatus.PENDING && (
        <div className="details-actions">
          <Button variant="primary" onClick={handleApprove} disabled={acting}>
            Aprobar
          </Button>
          <Button variant="secondary" onClick={handleReject} disabled={acting}>
            Rechazar
          </Button>
        </div>
      )}
    </section>
  )
}