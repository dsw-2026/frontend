import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/Button'
import { useProvinceList } from '@/features/province/useProvinces'
import type { LocalityInput } from '../locality.model'

const localitySchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).transform((v) => v.trim()),
  postalCode: z.string().min(3, { message: 'El código postal debe tener al menos 3 caracteres' }).transform((v) => v.trim()),
  province: z.coerce.number().int().positive({ message: 'Seleccioná una provincia' }),
})

type LocalityFormValues = z.input<typeof localitySchema>

interface LocalityFormProps {
  initialValues?: LocalityInput
  onSubmit: (values: LocalityInput) => void
  submitting: boolean
}

const inputClass =
  'w-full px-3 py-2 border rounded-lg transition-all text-slate-800 focus:outline-none focus:ring-2'

export function LocalityForm({ initialValues, onSubmit, submitting }: LocalityFormProps) {
  const { data: provinces = [], isLoading } = useProvinceList()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalityFormValues>({
    resolver: zodResolver(localitySchema),
    defaultValues: initialValues
      ? { name: initialValues.name, postalCode: initialValues.postalCode, province: initialValues.province }
      : { name: '', postalCode: '', province: 0 },
  })

  if (isLoading) return <p className="text-slate-500">Cargando provincias…</p>

  if (provinces.length === 0) {
    return (
      <p className="text-slate-500">
        No hay provincias cargadas. Creá una primero para poder asignarle una localidad.
      </p>
    )
  }

  // El schema transforma y valida; el resultado ya tiene province como number.
  const submit = handleSubmit((values) => onSubmit(values as LocalityInput))

  return (
    <form
      onSubmit={submit}
      className="space-y-6 max-w-md bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="locality-name" className="text-sm font-semibold text-slate-700">Nombre</label>
        <input
          id="locality-name"
          type="text"
          placeholder="Ej: Rosario"
          autoFocus
          {...register('name')}
          className={`${inputClass} ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`}
        />
        {errors.name && <span className="text-xs font-medium text-red-600">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="locality-postal" className="text-sm font-semibold text-slate-700">Código postal</label>
        <input
          id="locality-postal"
          type="text"
          placeholder="Ej: 2000"
          {...register('postalCode')}
          className={`${inputClass} ${errors.postalCode ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`}
        />
        {errors.postalCode && <span className="text-xs font-medium text-red-600">{errors.postalCode.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="locality-province" className="text-sm font-semibold text-slate-700">Provincia</label>
        <select
          id="locality-province"
          {...register('province')}
          className={`${inputClass} ${errors.province ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`}
        >
          <option value={0}>Seleccioná una provincia</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.province && <span className="text-xs font-medium text-red-600">{errors.province.message}</span>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Guardando…' : 'Guardar localidad'}
        </Button>
      </div>
    </form>
  )
}