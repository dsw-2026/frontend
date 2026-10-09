import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/Button'
import type { SpeciesInput } from '../species.model'

const speciesSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .transform((val) => val.trim()),
})

interface SpeciesFormProps {
  initialValues?: SpeciesInput
  onSubmit: (values: SpeciesInput) => void
  submitting: boolean
}

export function SpeciesForm({ initialValues, onSubmit, submitting }: SpeciesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpeciesInput>({
    resolver: zodResolver(speciesSchema),
    defaultValues: initialValues ?? { name: '' },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="species-name" className="text-sm font-semibold text-slate-700">
          Nombre de la especie
        </label>
        <input
          id="species-name"
          type="text"
          placeholder="Ej: Perro, Gato..."
          autoFocus
          {...register('name')}
          className={`w-full px-3 py-2 border rounded-lg transition-all text-slate-800 focus:outline-none focus:ring-2 ${
            errors.name
              ? 'border-red-300 focus:ring-red-500'
              : 'border-slate-300 focus:ring-blue-500'
          }`}
        />
        {errors.name && (
          <span className="text-xs font-medium text-red-600">{errors.name.message}</span>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Guardando…' : 'Guardar especie'}
        </Button>
      </div>
    </form>
  )
}