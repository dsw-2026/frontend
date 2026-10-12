import { Link, useParams } from 'react-router-dom'
import { usePet } from '../usePets.ts'
import { AvatarZoom } from '@/shared/components/ui/AvatarZoom'
import { ApiError } from '@/shared/api/httpClient'

const SIZE_TEXT: Record<string, string> = { SMALL: 'Pequeño', MEDIUM: 'Mediano', LARGE: 'Grande', GIANT: 'Gigante' }
const ENERGY_TEXT: Record<string, string> = { LOW: 'Baja', MEDIUM: 'Media', HIGH: 'Alta' }
const TOLERANCE_TEXT: Record<string, string> = { YES: 'Sí', NO: 'No', UNKNOWN: 'Sin datos' }

export function PetDetailPage (){
  const { id } = useParams()
  const { data: pet, isLoading, error } = usePet(id ? Number(id) : undefined)
  if (isLoading) return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>
  if (error) return <div className="p-4 m-6 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error instanceof ApiError ? error.message : 'No se pudo cargar la mascota'}</div>
  if (!pet) return null
  const cardClass = 'bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col items-center text-center'
  const factClass = 'text-sm text-slate-600'
  return (
    <section className="space-y-6 p-6 max-w-5xl mx-auto">
      <Link to="/adopt" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        ← Volver
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Detalle de la mascota</h1>


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
            <li className={factClass}><strong>Vacunado:</strong> {pet.characteristic.vaccinated ? "✓" : "✗"}</li>
            <li className={factClass}><strong>Castrado:</strong> {pet.characteristic.neutered ? "✓" : "✗"}</li>
            <li className={factClass}><strong>Tolera niños:</strong> {TOLERANCE_TEXT[pet.characteristic.toleratesChildren] ?? 'Sin datos'}</li>
            <li className={factClass}><strong>Tolera otros animales:</strong> {TOLERANCE_TEXT[pet.characteristic.toleratesOtherAnimals] ?? 'Sin datos'}</li>
            <li className={factClass}><strong>Tolera encierro:</strong> {TOLERANCE_TEXT[pet.characteristic.toleratesConfinement] ?? 'Sin datos'}</li>
            <li className={factClass}><strong>Notas adicionales:</strong> {pet.characteristic.additionalNotes}</li>
            
          </ul>
        </div>

      
    </section>
  )
}
