import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/Button'
import { API_ORIGIN } from '@/shared/api/httpClient'
import { useAuth } from '@/shared/api/useAuth'
import { EnergyLevel, Size, Tolerance, type Pet } from '@/features/pet/pet.model'
import type { ApplicationInput } from '../application.model'

const ENERGY_LABELS: Record<EnergyLevel, string> = { LOW: 'Baja', MEDIUM: 'Media', HIGH: 'Alta' }
const SIZE_LABELS: Record<Size, string> = { SMALL: 'Pequeño', MEDIUM: 'Mediano', LARGE: 'Grande', GIANT: 'Gigante' }
const TOLERANCE_LABELS: Record<Tolerance, string> = { YES: 'Sí', NO: 'No', UNKNOWN: 'No me importa' }

const applicationSchema = z.object({
  pet: z.coerce.number().int().positive({ message: 'Seleccioná una mascota' }),
  message: z.string().optional(),
  desiredEnergyLevel: z.enum(EnergyLevel),
  desiredSize: z.enum(Size),
  desiredToleratesChildren: z.enum(Tolerance),
  desiredToleratesOtherAnimals: z.enum(Tolerance),
  desiredToleratesConfinement: z.enum(Tolerance),
})

type FormValues = z.input<typeof applicationSchema>

interface ApplicationFormProps {
  fixedPet?: Pet
  availablePets?: Pet[]
  onSubmit: (values: ApplicationInput) => void
  submitting: boolean
}

const inputClass =
  'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors'
const labelClass = 'text-xs font-semibold text-slate-700'

export function ApplicationForm({ fixedPet, availablePets = [], onSubmit, submitting }: ApplicationFormProps) {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      pet: fixedPet?.id ?? 0,
      message: '',
      desiredEnergyLevel: 'MEDIUM',
      desiredSize: 'MEDIUM',
      desiredToleratesChildren: 'UNKNOWN',
      desiredToleratesOtherAnimals: 'UNKNOWN',
      desiredToleratesConfinement: 'UNKNOWN',
    },
  })

  const submit = handleSubmit((values) => onSubmit({ ...values, pet: Number(values.pet) } as ApplicationInput))

  return (
    <form onSubmit={submit} className="w-full max-w-xl bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      {fixedPet ? (
        <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
          {fixedPet.photo && (
            <img
              src={fixedPet.photo.startsWith('http') ? fixedPet.photo : `${API_ORIGIN}${fixedPet.photo}`}
              alt={fixedPet.name}
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {fixedPet.name} <span className="font-normal text-slate-500">({fixedPet.species?.name})</span>
            </p>
            <Link to="/adopt" className="text-xs font-medium text-blue-600 hover:underline">
              Elegir otra mascota
            </Link>
          </div>
          <input type="hidden" {...register('pet')} value={fixedPet.id} />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Mascota</label>
          <select {...register('pet')} className={inputClass}>
            <option value="">Seleccioná una mascota disponible</option>
            {availablePets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.species?.name})
              </option>
            ))}
          </select>
          {errors.pet && <span className="text-xs text-red-500">{errors.pet.message}</span>}
        </div>
      )}

      {user?.username && (
        <p className="text-xs text-slate-500">
          Solicitás como <strong className="font-semibold text-slate-700">{user.username}</strong>
        </p>
      )}

      <div className="space-y-3 pt-1">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-1.5">
          ¿Qué buscás en tu mascota?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Nivel de energía</label>
            <select {...register('desiredEnergyLevel')} className={inputClass}>
              {Object.values(EnergyLevel).map((v) => (
                <option key={v} value={v}>{ENERGY_LABELS[v]}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Tamaño</label>
            <select {...register('desiredSize')} className={inputClass}>
              {Object.values(Size).map((v) => (
                <option key={v} value={v}>{SIZE_LABELS[v]}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>¿Que tolere niños?</label>
            <select {...register('desiredToleratesChildren')} className={inputClass}>
              {Object.values(Tolerance).map((v) => (
                <option key={v} value={v}>{TOLERANCE_LABELS[v]}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>¿Que tolere otros animales?</label>
            <select {...register('desiredToleratesOtherAnimals')} className={inputClass}>
              {Object.values(Tolerance).map((v) => (
                <option key={v} value={v}>{TOLERANCE_LABELS[v]}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className={labelClass}>¿Que tolere el encierro?</label>
            <select {...register('desiredToleratesConfinement')} className={inputClass}>
              {Object.values(Tolerance).map((v) => (
                <option key={v} value={v}>{TOLERANCE_LABELS[v]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>Mensaje (opcional)</label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Contanos por qué te interesa esta mascota..."
          className={inputClass}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Enviando…' : 'Enviar solicitud'}
        </Button>
      </div>
    </form>
  )
}