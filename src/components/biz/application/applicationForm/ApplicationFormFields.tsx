import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui/button/Button'
import { API_ORIGIN } from '../../../../api/httpClient'
import { useAuth } from '../../../../api/AuthContext'
import { EnergyLevel, Size, Tolerance, type Pet } from '../../../../models/pet'
import type { ApplicationInput } from '../../../../models/application'
import { ENERGY_LEVEL_LABELS, SIZE_LABELS } from '../../pet/petForm/PetForm.data'
import { DESIRED_TOLERANCE_LABELS } from './ApplicationForm.data'

interface ApplicationFormFieldsProps {
  fixedPet?: Pet
  availablePets?: Pet[]
  onSubmit: (values: ApplicationInput) => void
  submitting: boolean
}

export function ApplicationFormFields({
  fixedPet,
  availablePets = [],
  onSubmit,
  submitting,
}: ApplicationFormFieldsProps) {
  const { user } = useAuth()

  const [petId, setPetId] = useState(fixedPet ? String(fixedPet.id) : '')
  const [message, setMessage] = useState('')

  const [desiredEnergyLevel, setDesiredEnergyLevel] = useState<EnergyLevel>(EnergyLevel.MEDIUM)
  const [desiredSize, setDesiredSize] = useState<Size>(Size.MEDIUM)
  const [desiredToleratesChildren, setDesiredToleratesChildren] = useState<Tolerance>(Tolerance.UNKNOWN)
  const [desiredToleratesOtherAnimals, setDesiredToleratesOtherAnimals] = useState<Tolerance>(Tolerance.UNKNOWN)
  const [desiredToleratesConfinement, setDesiredToleratesConfinement] = useState<Tolerance>(Tolerance.UNKNOWN)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      pet: Number(petId),
      message: message.trim() || undefined,
      desiredEnergyLevel,
      desiredSize,
      desiredToleratesChildren,
      desiredToleratesOtherAnimals,
      desiredToleratesConfinement,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form form-wide">
      {fixedPet ? (
        <div className="fixed-pet-card">
          {fixedPet.photo && (
            <img
              src={fixedPet.photo.startsWith('http') ? fixedPet.photo : `${API_ORIGIN}${fixedPet.photo}`}
              alt={fixedPet.name}
            />
          )}
          <div>
            <strong>{fixedPet.name}</strong>
            <span> ({fixedPet.species.name})</span>
            <Link to="/adopt" className="	fixed-pet-change">
              Elegir otra mascota
            </Link>
          </div>
        </div>
      ) : (
        <label className="form-field">
          <span>Mascota</span>
          <select value={petId} onChange={(event) => setPetId(event.target.value)} required autoFocus>
            <option value="" disabled>
              Seleccioná una mascota disponible
            </option>
            {availablePets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.species.name})
              </option>
            ))}
          </select>
        </label>
      )}

      <p className="form-hint">
        Solicitás como <strong>{user?.username}</strong>
      </p>

      <h2 className="form-section-title">¿Qué buscás en tu mascota?</h2>
      <label className="form-field">
        <span>Nivel de energía que buscás</span>
        <select
          value={desiredEnergyLevel}
          onChange={(event) => setDesiredEnergyLevel(event.target.value as EnergyLevel)}
          autoFocus={Boolean(fixedPet)}
        >
          {Object.values(EnergyLevel).map((value) => (
            <option key={value} value={value}>
              {ENERGY_LEVEL_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Tamaño que buscás</span>
        <select value={desiredSize} onChange={(event) => setDesiredSize(event.target.value as Size)}>
          {Object.values(Size).map((value) => (
            <option key={value} value={value}>
              {SIZE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>¿Buscás que tolere niños?</span>
        <select
          value={desiredToleratesChildren}
          onChange={(event) => setDesiredToleratesChildren(event.target.value as Tolerance)}
        >
          {Object.values(Tolerance).map((value) => (
            <option key={value} value={value}>
              {DESIRED_TOLERANCE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>¿Buscás que tolere otros animales?</span>
        <select
          value={desiredToleratesOtherAnimals}
          onChange={(event) => setDesiredToleratesOtherAnimals(event.target.value as Tolerance)}
        >
          {Object.values(Tolerance).map((value) => (
            <option key={value} value={value}>
              {DESIRED_TOLERANCE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>¿Buscás que tolere el encierro?</span>
        <select
          value={desiredToleratesConfinement}
          onChange={(event) => setDesiredToleratesConfinement(event.target.value as Tolerance)}
        >
          {Object.values(Tolerance).map((value) => (
            <option key={value} value={value}>
              {DESIRED_TOLERANCE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field">
        <span>Mensaje (opcional)</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          placeholder="Por qué le interesa esta mascota, algo para contarle al publicador..."
        />
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Enviando…' : 'Enviar solicitud'}
      </Button>
    </form>
  )
}