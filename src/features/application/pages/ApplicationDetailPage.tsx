import { Link, useParams } from 'react-router-dom'
import { useApplication, useApproveApplication, useRejectApplication } from '../useApplications'
import { calculateBreakdown, totalCompatibility } from '../compatibility'
import { ApplicationStatus } from '../application.model'
import { AvatarZoom } from '@/shared/components/ui/AvatarZoom'
import { Button } from '@/shared/components/ui/Button'
import { ApiError } from '@/shared/api/httpClient'
import { useAuth } from '@/shared/api/useAuth'

const SIZE_TEXT: Record<string, string> = { SMALL: 'Pequeño', MEDIUM: 'Mediano', LARGE: 'Grande', GIANT: 'Gigante' }
const ENERGY_TEXT: Record<string, string> = { LOW: 'Baja', MEDIUM: 'Media', HIGH: 'Alta' }
const HOUSING_TEXT: Record<string, string> = { HOUSE: 'Casa', APARTMENT: 'Departamento', OTHER: 'Otro' }

export function ApplicationDetailPage() {
  const { user } = useAuth()
  const isPublisher = user?.userType === 'Publisher'
  const { id } = useParams()

  const { data: application, isLoading, error } = useApplication(id ? Number(id) : undefined)
  const approve = useApproveApplication()
  const reject = useRejectApplication()

  if (isLoading) return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>
  if (error) return <div className="p-4 m-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error instanceof ApiError ? error.message : 'No se pudo cargar la solicitud'}</div>
  if (!application) return null

  const { pet, adopter } = application
  const breakdown = calculateBreakdown(application)
  const { points, total, percentage } = totalCompatibility(breakdown)

  const cardClass = 'bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col items-center text-center'
  const factClass = 'text-sm text-slate-600'

  return (
    <section className="space-y-6 p-6 max-w-5xl mx-auto">
      <Link to="/applications" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        ← Volver a solicitudes
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Detalle de la solicitud</h1>

      <div className="grid md:grid-cols-2 gap-5">
        <div className={cardClass}>
          <AvatarZoom src={adopter.profilePhoto} alt={`${adopter.firstName} ${adopter.lastName}`} fallbackText={adopter.firstName.charAt(0).toUpperCase()} />
          <h2 className="text-xl font-bold text-slate-900 mt-3">{adopter.firstName} {adopter.lastName}</h2>
          <p className="text-sm text-slate-500 mb-3">Adoptante</p>
          <ul className="space-y-1 text-left w-full">
            <li className={factClass}><strong>Email:</strong> {adopter.email}</li>
            {adopter.phone && <li className={factClass}><strong>Teléfono:</strong> {adopter.phone}</li>}
            {adopter.locality && <li className={factClass}><strong>Localidad:</strong> {adopter.locality.name} ({adopter.locality.province?.name})</li>}
            {adopter.occupation && <li className={factClass}><strong>Ocupación:</strong> {adopter.occupation}</li>}
            {adopter.housingType && <li className={factClass}><strong>Vivienda:</strong> {HOUSING_TEXT[adopter.housingType]}</li>}
          </ul>
        </div>

        <div className={cardClass}>
          <AvatarZoom src={pet.photo} alt={pet.name} fallbackText={pet.name.charAt(0).toUpperCase()} />
          <h2 className="text-xl font-bold text-slate-900 mt-3">{pet.name}</h2>
          <p className="text-sm text-slate-500 mb-3">{pet.species?.name} · Publicado por {pet.publisher?.firstName} {pet.publisher?.lastName}</p>
          <ul className="space-y-1 text-left w-full">
            <li className={factClass}><strong>Sexo:</strong> {pet.sex === 'MALE' ? 'Macho' : 'Hembra'}</li>
            <li className={factClass}><strong>Edad:</strong> {pet.age} {pet.ageUnit === 'MONTHS' ? 'meses' : 'años'}</li>
            <li className={factClass}><strong>Tamaño:</strong> {SIZE_TEXT[pet.characteristic.size]}</li>
            <li className={factClass}><strong>Energía:</strong> {ENERGY_TEXT[pet.characteristic.energyLevel]}</li>
            <li className={factClass}><strong>Carácter:</strong> {pet.characteristic.temperament}</li>
          </ul>
        </div>
      </div>

      <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Compatibilidad</h2>
      <p className="text-slate-700">
        <strong>{points} de {total} ({percentage}%)</strong> — coincidencias entre lo que busca el adoptante y las características de la mascota.
      </p>

      <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-slate-200">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-700 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Factor</th>
              <th className="px-4 py-3">Mascota</th>
              <th className="px-4 py-3">Adoptante</th>
              <th className="px-4 py-3">Resultado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {breakdown.map((item) => (
              <tr key={item.factor}>
                <td className="px-4 py-3 font-medium text-slate-900">{item.factor}</td>
                <td className="px-4 py-3">{item.petDetail}</td>
                <td className="px-4 py-3">{item.adopterDetail}</td>
                <td className="px-4 py-3">
                  {item.compatible
                    ? <span className="text-green-600 font-semibold">✓ Coincide</span>
                    : <span className="text-red-500 font-semibold">✗ No coincide</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {application.message && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">Mensaje del adoptante</h2>
          <p className="text-slate-700">{application.message}</p>
        </div>
      )}

      {isPublisher && application.status === ApplicationStatus.PENDING && (
        <div className="flex gap-3">
          <Button variant="primary" onClick={() => approve.mutate(application.id)} disabled={approve.isPending || reject.isPending}>Aprobar</Button>
          <Button variant="secondary" onClick={() => reject.mutate(application.id)} disabled={approve.isPending || reject.isPending}>Rechazar</Button>
        </div>
      )}
    </section>
  )
}