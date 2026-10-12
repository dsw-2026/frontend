import { Link, useParams } from 'react-router-dom'
import { usePet } from '../usePets.ts'
import { API_ORIGIN } from '@/shared/api/httpClient'
import { ApiError } from '@/shared/api/httpClient'

const SIZE_TEXT: Record<string, string> = { SMALL: 'Pequeño', MEDIUM: 'Mediano', LARGE: 'Grande', GIANT: 'Gigante' }
const ENERGY_TEXT: Record<string, string> = { LOW: 'Baja', MEDIUM: 'Media', HIGH: 'Alta' }
const TOLERANCE_TEXT: Record<string, string> = { YES: 'Sí', NO: 'No', UNKNOWN: 'Sin datos' }
const TOLERANCE_CLASS: Record<string, string> = {
  YES: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  NO: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
  UNKNOWN: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
}

const sectionTitle = 'mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500'
const yesClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
const noClass = 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'

function photoUrl(photo?: string | null) {
  if (!photo) return null
  return photo.startsWith('http') ? photo : `${API_ORIGIN}${photo}`
}

function Row({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-sm text-slate-700 dark:text-slate-200">{label}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{value}</span>
    </li>
  )
}

export function PetDetailPage() {
  const { id } = useParams()
  const { data: pet, isLoading, error } = usePet(id ? Number(id) : undefined)

  if (isLoading) return <div className="text-center py-10 text-slate-500 dark:text-slate-400 font-medium">Cargando…</div>
  if (error)
    return (
      <div className="p-4 m-6 bg-red-50 border border-red-200 text-red-700 rounded-lg dark:bg-red-950/50 dark:border-red-800/40 dark:text-red-400">
        {error instanceof ApiError ? error.message : 'No se pudo cargar la mascota'}
      </div>
    )
  if (!pet) return null

  const c = pet.characteristic
  const src = photoUrl(pet.photo)
  const notes = c.additionalNotes

  return (
    <section className="space-y-6 p-6 max-w-5xl mx-auto">
      <Link
        to="/adopt"
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors dark:text-slate-400 dark:hover:text-slate-100"
      >
        ← Volver
      </Link>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Foto */}
        {src ? (
          <img
            src={src}
            alt={pet.name}
            className="aspect-square w-full rounded-2xl object-cover border border-slate-200 shadow-sm dark:border-slate-700"
          />
        ) : (
          <div className="aspect-square w-full rounded-2xl bg-sky-100 flex items-center justify-center text-7xl dark:bg-sky-950/50">🐾</div>
        )}

        {/* Información */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 dark:border-slate-700 dark:bg-slate-900">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{pet.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">{pet.species?.name}</span>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Sexo</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">{pet.sex === 'MALE' ? 'Macho' : 'Hembra'}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Edad</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">
                {pet.age} {pet.ageUnit === 'MONTHS' ? 'meses' : 'años'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Tamaño</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">{SIZE_TEXT[c.size] ?? c.size}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Energía</dt>
              <dd className="font-semibold text-slate-900 dark:text-slate-100">{ENERGY_TEXT[c.energyLevel] ?? c.energyLevel}</dd>
            </div>
          </dl>

          <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
            <h2 className={sectionTitle}>Salud y convivencia</h2>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              <Row label="Vacunado" value={c.vaccinated ? 'Sí' : 'No'} className={c.vaccinated ? yesClass : noClass} />
              <Row label="Castrado" value={c.neutered ? 'Sí' : 'No'} className={c.neutered ? yesClass : noClass} />
              <Row
                label="Tolera niños"
                value={TOLERANCE_TEXT[c.toleratesChildren] ?? 'Sin datos'}
                className={TOLERANCE_CLASS[c.toleratesChildren] ?? TOLERANCE_CLASS.UNKNOWN}
              />
              <Row
                label="Tolera otros animales"
                value={TOLERANCE_TEXT[c.toleratesOtherAnimals] ?? 'Sin datos'}
                className={TOLERANCE_CLASS[c.toleratesOtherAnimals] ?? TOLERANCE_CLASS.UNKNOWN}
              />
              <Row
                label="Tolera encierro"
                value={TOLERANCE_TEXT[c.toleratesConfinement] ?? 'Sin datos'}
                className={TOLERANCE_CLASS[c.toleratesConfinement] ?? TOLERANCE_CLASS.UNKNOWN}
              />
            </ul>
          </div>

          {c.temperament && (
            <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
              <h2 className={sectionTitle}>Carácter</h2>
              <p className="text-slate-700 leading-relaxed dark:text-slate-300">{c.temperament}</p>
            </div>
          )}

          {notes && (
            <div className="border-t border-slate-100 pt-6 dark:border-slate-800">
              <h2 className={sectionTitle}>Notas adicionales</h2>
              <p className="text-slate-700 leading-relaxed dark:text-slate-300">{notes}</p>
            </div>
          )}

          <p className="border-t border-slate-100 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Publicado por{' '}
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {pet.publisher?.firstName} {pet.publisher?.lastName}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}