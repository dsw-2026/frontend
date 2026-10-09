import { Link } from 'react-router-dom'
import type { Pet } from '../pet.model'
import { API_ORIGIN } from '@/shared/api/httpClient'

interface PetCardProps {
  pet: Pet
}

const SIZE_LABELS: Record<string, string> = {
  SMALL: 'Pequeño', MEDIUM: 'Mediano', LARGE: 'Grande', GIANT: 'Gigante',
}

export function PetCard({ pet }: PetCardProps) {
  const photoUrl = pet.photo ? (pet.photo.startsWith('http') ? pet.photo : `${API_ORIGIN}${pet.photo}`) : null

  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {photoUrl ? (
        <img src={photoUrl} alt={pet.name} className="w-full aspect-[4/3] object-cover" />
      ) : (
        <div className="w-full aspect-[4/3] bg-blue-50 flex items-center justify-center text-5xl" aria-hidden="true">🐾</div>
      )}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-slate-900">{pet.name}</h3>
        <p className="text-sm text-slate-500">
          {pet.species?.name} · {pet.age} {pet.ageUnit === 'MONTHS' ? 'meses' : 'años'} · {SIZE_LABELS[pet.characteristic?.size]}
        </p>
        <p className="text-sm text-slate-600 line-clamp-2 mb-3">{pet.characteristic?.temperament}</p>
        <Link
          to={`/applications/new?pet=${pet.id}`}
          className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors self-start"
        >
          Solicitar adopción
        </Link>
      </div>
    </article>
  )
}