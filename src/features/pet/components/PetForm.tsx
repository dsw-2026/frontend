import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/Button'
import { FotoUpload } from '@/shared/components/ui/PhotoUpload'
import { useSpeciesList } from '@/features/species/useSpecies'
import { Sex, AgeUnit, PetStatus, Size, EnergyLevel, Tolerance, type PetInput } from '../pet.model'

const SEX_LABELS: Record<Sex, string> = { MALE: 'Macho', FEMALE: 'Hembra' }
const AGE_UNIT_LABELS: Record<AgeUnit, string> = { MONTHS: 'Meses', YEARS: 'Años' }
const STATUS_LABELS: Record<PetStatus, string> = {
  AVAILABLE: 'Disponible', IN_PROCESS: 'En proceso', ADOPTED: 'Adoptada', UNAVAILABLE: 'No disponible',
}
const SIZE_LABELS: Record<Size, string> = { SMALL: 'Pequeño', MEDIUM: 'Mediano', LARGE: 'Grande', GIANT: 'Gigante' }
const ENERGY_LABELS: Record<EnergyLevel, string> = { LOW: 'Baja', MEDIUM: 'Media', HIGH: 'Alta' }
const TOLERANCE_LABELS: Record<Tolerance, string> = { YES: 'Sí', NO: 'No', UNKNOWN: 'Desconocido' }

const petSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es obligatorio' }),
  sex: z.enum(Sex),
  age: z.coerce.number().int().positive({ message: 'La edad debe ser positiva' }),
  ageUnit: z.enum(AgeUnit),
  status: z.enum(PetStatus),
  photo: z.string().optional(),
  species: z.coerce.number().int().positive({ message: 'Seleccioná una especie' }),
  energyLevel: z.enum(EnergyLevel),
  temperament: z.string().min(1, { message: 'El carácter es obligatorio' }),
  size: z.enum(Size),
  vaccinated: z.boolean(),
  neutered: z.boolean(),
  toleratesChildren: z.enum(Tolerance),
  toleratesOtherAnimals: z.enum(Tolerance),
  toleratesConfinement: z.enum(Tolerance),
  additionalNotes: z.string().optional(),
})

type FormValues = z.input<typeof petSchema>

interface PetFormProps {
  initialValues?: Partial<FormValues>
  onSubmit: (values: PetInput) => void
  submitting: boolean
}

const inputClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
const labelClass = 'text-sm font-semibold text-slate-700'
const sectionClass = 'text-lg font-bold text-slate-900 border-b border-slate-100 pb-2'

export function PetForm({ initialValues, onSubmit, submitting }: PetFormProps) {
  const { data: species = [] } = useSpeciesList()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: '', sex: 'MALE', age: 1, ageUnit: 'YEARS', status: 'AVAILABLE', photo: '',
      energyLevel: 'MEDIUM', temperament: '', size: 'MEDIUM',
      vaccinated: false, neutered: false,
      toleratesChildren: 'UNKNOWN', toleratesOtherAnimals: 'UNKNOWN', toleratesConfinement: 'UNKNOWN',
      additionalNotes: '',
      ...initialValues,
    },
  })

  const photo = useWatch({ control, name: 'photo' })

  const submit = handleSubmit((values) => onSubmit({ ...values, species: Number(values.species), age: Number(values.age) } as PetInput))

  if (species.length === 0) {
    return <p className="text-slate-500">No hay especies cargadas. Creá una primero para poder registrar una mascota.</p>
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <h2 className={sectionClass}>Datos de la mascota</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Nombre</label>
          <input autoFocus {...register('name')} className={inputClass} />
          {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Especie</label>
          <select {...register('species')} className={inputClass}>
            <option value="">Seleccioná una especie</option>
            {species.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          {errors.species && <span className="text-xs text-red-600">{errors.species.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Sexo</label>
          <select {...register('sex')} className={inputClass}>
            {Object.values(Sex).map((v) => <option key={v} value={v}>{SEX_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Edad</label>
          <input type="number" min={0} {...register('age')} className={inputClass} />
          {errors.age && <span className="text-xs text-red-600">{errors.age.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Unidad de edad</label>
          <select {...register('ageUnit')} className={inputClass}>
            {Object.values(AgeUnit).map((v) => <option key={v} value={v}>{AGE_UNIT_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Estado</label>
          <select {...register('status')} className={inputClass}>
            {Object.values(PetStatus).map((v) => <option key={v} value={v}>{STATUS_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Foto</label>
          <FotoUpload value={photo ?? ''} onChange={(url) => setValue('photo', url)} label="foto" />
        </div>
      </div>

      <h2 className={sectionClass}>Características</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Energía</label>
          <select {...register('energyLevel')} className={inputClass}>
            {Object.values(EnergyLevel).map((v) => <option key={v} value={v}>{ENERGY_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Tamaño</label>
          <select {...register('size')} className={inputClass}>
            {Object.values(Size).map((v) => <option key={v} value={v}>{SIZE_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Carácter</label>
          <input {...register('temperament')} placeholder="Ej: Juguetón y cariñoso" className={inputClass} />
          {errors.temperament && <span className="text-xs text-red-600">{errors.temperament.message}</span>}
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('vaccinated')} />
          <span className="text-sm text-slate-700">Vacunado</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('neutered')} />
          <span className="text-sm text-slate-700">Castrado</span>
        </label>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Tolera niños</label>
          <select {...register('toleratesChildren')} className={inputClass}>
            {Object.values(Tolerance).map((v) => <option key={v} value={v}>{TOLERANCE_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Tolera otros animales</label>
          <select {...register('toleratesOtherAnimals')} className={inputClass}>
            {Object.values(Tolerance).map((v) => <option key={v} value={v}>{TOLERANCE_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Tolera el encierro</label>
          <select {...register('toleratesConfinement')} className={inputClass}>
            {Object.values(Tolerance).map((v) => <option key={v} value={v}>{TOLERANCE_LABELS[v]}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Observaciones adicionales</label>
          <textarea {...register('additionalNotes')} rows={3} className={inputClass} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}