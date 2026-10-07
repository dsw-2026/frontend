import { useState, type FormEvent } from 'react'
import { Button } from '../../../shared/ui/button/Button'
import { PhotoUpload } from '../../../shared/ui/photoUpload/PhotoUpload'
import {
  Sex,
  AgeUnit,
  PetStatus,
  Size,
  EnergyLevel,
  Tolerance,
  type PetInput,
} from '../../../../models/pet'
import type { Species } from '../../../../models/species'
import {
  SEX_LABELS,
  AGE_UNIT_LABELS,
  STATUS_LABELS,
  SIZE_LABELS,
  ENERGY_LEVEL_LABELS,
  TOLERANCE_LABELS,
  type PetFormValues,
} from './PetForm.data'

interface PetFormFieldsProps {
  initialValues?: PetFormValues
  speciesList: Species[]
  onSubmit: (values: PetInput) => void
  submitting: boolean
}

export function PetFormFields({ initialValues, speciesList, onSubmit, submitting }: PetFormFieldsProps) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [sex, setSex] = useState<Sex>(initialValues?.sex ?? Sex.MALE)
  const [age, setAge] = useState(initialValues ? String(initialValues.age) : '')
  const [ageUnit, setAgeUnit] = useState<AgeUnit>(initialValues?.ageUnit ?? AgeUnit.YEARS)
  const [status, setStatus] = useState<PetStatus>(initialValues?.status ?? PetStatus.AVAILABLE)
  const [photo, setPhoto] = useState(initialValues?.photo ?? '')
  const [speciesId, setSpeciesId] = useState(initialValues ? String(initialValues.speciesId) : '')

  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>(initialValues?.energyLevel ?? EnergyLevel.MEDIUM)
  const [temperament, setTemperament] = useState(initialValues?.temperament ?? '')
  const [size, setSize] = useState<Size>(initialValues?.size ?? Size.MEDIUM)
  const [vaccinated, setVaccinated] = useState(initialValues?.vaccinated ?? false)
  const [neutered, setNeutered] = useState(initialValues?.neutered ?? false)
  const [toleratesChildren, setToleratesChildren] = useState<Tolerance>(
    initialValues?.toleratesChildren ?? Tolerance.UNKNOWN
  )
  const [toleratesOtherAnimals, setToleratesOtherAnimals] = useState<Tolerance>(
    initialValues?.toleratesOtherAnimals ?? Tolerance.UNKNOWN
  )
  const [toleratesConfinement, setToleratesConfinement] = useState<Tolerance>(
    initialValues?.toleratesConfinement ?? Tolerance.UNKNOWN
  )
  const [additionalNotes, setAdditionalNotes] = useState(initialValues?.additionalNotes ?? '')

  const isStatusEditable = status === PetStatus.AVAILABLE || status === PetStatus.UNAVAILABLE

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      name: name.trim(),
      sex,
      age: Number(age),
      ageUnit,
      status,
      photo: photo.trim() || undefined,
      species: Number(speciesId),
      energyLevel,
      temperament: temperament.trim(),
      size,
      vaccinated,
      neutered,
      toleratesChildren,
      toleratesOtherAnimals,
      toleratesConfinement,
      additionalNotes: additionalNotes.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form form-wide">
      <h2 className="form-section-title">Datos de la mascota</h2>
      <label className="form-field">
        <span>Nombre</span>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} required autoFocus />
      </label>
      <label className="form-field">
        <span>Especie</span>
        <select value={speciesId} onChange={(event) => setSpeciesId(event.target.value)} required>
          <option value="" disabled>
            Seleccioná una especie
          </option>
          {speciesList.map((species) => (
            <option key={species.id} value={species.id}>
              {species.name}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Sexo</span>
        <select value={sex} onChange={(event) => setSex(event.target.value as Sex)}>
          {Object.values(Sex).map((value) => (
            <option key={value} value={value}>
              {SEX_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Edad</span>
        <input type="number" value={age} onChange={(event) => setAge(event.target.value)} required min={0} />
      </label>
      <label className="form-field">
        <span>Unidad de edad</span>
        <select value={ageUnit} onChange={(event) => setAgeUnit(event.target.value as AgeUnit)}>
          {Object.values(AgeUnit).map((value) => (
            <option key={value} value={value}>
              {AGE_UNIT_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      {initialValues && (
        <label className="form-field">
          <span>Estado</span>
          {isStatusEditable ? (
            <select value={status} onChange={(event) => setStatus(event.target.value as PetStatus)}>
              <option value={PetStatus.AVAILABLE}>{STATUS_LABELS.AVAILABLE}</option>
              <option value={PetStatus.UNAVAILABLE}>{STATUS_LABELS.UNAVAILABLE}</option>
            </select>
          ) : (
            <p className="form-hint">{STATUS_LABELS[status]} — lo determina el flujo de solicitudes</p>
          )}
        </label>
      )}
      <label className="form-field">
        <span>Foto</span>
        <PhotoUpload value={photo} onChange={setPhoto} label="foto" />
      </label>

      <h2 className="form-section-title">Características</h2>
      <label className="form-field">
        <span>Energía</span>
        <select value={energyLevel} onChange={(event) => setEnergyLevel(event.target.value as EnergyLevel)}>
          {Object.values(EnergyLevel).map((value) => (
            <option key={value} value={value}>
              {ENERGY_LEVEL_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Carácter</span>
        <input
          type="text"
          value={temperament}
          onChange={(event) => setTemperament(event.target.value)}
          required
          placeholder="Ej: Juguetón y cariñoso, un poco tímido al principio"
        />
      </label>
      <label className="form-field">
        <span>Tamaño</span>
        <select value={size} onChange={(event) => setSize(event.target.value as Size)}>
          {Object.values(Size).map((value) => (
            <option key={value} value={value}>
              {SIZE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field form-field-checkbox">
        <input type="checkbox" checked={vaccinated} onChange={(event) => setVaccinated(event.target.checked)} />
        <span>Vacunado</span>
      </label>
      <label className="form-field form-field-checkbox">
        <input type="checkbox" checked={neutered} onChange={(event) => setNeutered(event.target.checked)} />
        <span>Castrado</span>
      </label>
      <label className="form-field">
        <span>Tolera niños</span>
        <select
          value={toleratesChildren}
          onChange={(event) => setToleratesChildren(event.target.value as Tolerance)}
        >
          {Object.values(Tolerance).map((value) => (
            <option key={value} value={value}>
              {TOLERANCE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Tolera otros animales</span>
        <select
          value={toleratesOtherAnimals}
          onChange={(event) => setToleratesOtherAnimals(event.target.value as Tolerance)}
        >
          {Object.values(Tolerance).map((value) => (
            <option key={value} value={value}>
              {TOLERANCE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Tolera el encierro</span>
        <select
          value={toleratesConfinement}
          onChange={(event) => setToleratesConfinement(event.target.value as Tolerance)}
        >
          {Object.values(Tolerance).map((value) => (
            <option key={value} value={value}>
              {TOLERANCE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Observaciones adicionales</span>
        <textarea value={additionalNotes} onChange={(event) => setAdditionalNotes(event.target.value)} rows={3} />
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar'}
      </Button>
    </form>
  )
}