import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePet, useSavePet } from '../usePets'
import { PetForm } from '../components/PetForm'
import type { PetInput } from '../pet.model'
import { ApiError } from '@/shared/api/httpClient'

export function PetFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const { data: pet, isLoading, error: fetchError } = usePet(id ? Number(id) : undefined)
  const savePet = useSavePet(id ? Number(id) : undefined)

  function handleSubmit(values: PetInput) {
    savePet.mutate(values, { onSuccess: () => navigate('/pets') })
  }

  if (isLoading) return <div className="text-center py-10 text-slate-500 font-medium">Cargando…</div>

  const displayError = savePet.error || fetchError
  const errorMessage = displayError instanceof ApiError ? displayError.message : displayError ? 'No se pudo guardar la mascota' : null

  // Aplana la mascota (Pet + Characteristic) al formato del form.
  const initialValues = pet
    ? {
        name: pet.name,
        sex: pet.sex,
        age: pet.age,
        ageUnit: pet.ageUnit,
        status: pet.status,
        photo: pet.photo ?? '',
        species: pet.species.id,
        energyLevel: pet.characteristic.energyLevel,
        temperament: pet.characteristic.temperament,
        size: pet.characteristic.size,
        vaccinated: pet.characteristic.vaccinated,
        neutered: pet.characteristic.neutered,
        toleratesChildren: pet.characteristic.toleratesChildren,
        toleratesOtherAnimals: pet.characteristic.toleratesOtherAnimals,
        toleratesConfinement: pet.characteristic.toleratesConfinement,
        additionalNotes: pet.characteristic.additionalNotes ?? '',
      }
    : undefined

  return (
    <section className="space-y-6 p-6 max-w-4xl mx-auto">
      <Link to="/pets" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        ← Volver a mascotas
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {isEdit ? 'Editar mascota' : 'Nueva mascota'}
      </h1>

      {errorMessage && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">{errorMessage}</div>}

      <PetForm initialValues={initialValues} onSubmit={handleSubmit} submitting={savePet.isPending} />
    </section>
  )
}