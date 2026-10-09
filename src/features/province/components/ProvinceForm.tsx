import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/Button'
import type { ProvinceInput } from '../province.model'

const provinceSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .transform((val) => val.trim()),
  code: z
    .string()
    .min(2, { message: 'El código debe tener al menos 2 caracteres' })
    .max(4, { message: 'El código no puede superar los 4 caracteres' })
    .transform((val) => val.trim().toUpperCase()),
})

interface ProvinceFormProps {
  initialValues?: ProvinceInput
  onSubmit: (values: ProvinceInput) => void
  submitting: boolean
}

export function ProvinceForm({ initialValues, onSubmit, submitting }: ProvinceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProvinceInput>({
    resolver: zodResolver(provinceSchema),
    defaultValues: initialValues ?? { name: '', code: '' },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="province-name" className="text-sm font-semibold text-slate-700">
          Nombre
        </label>
        <input
          id="province-name"
          type="text"
          placeholder="Ej: Córdoba"
          autoFocus
          {...register('name')}
          className={`w-full px-3 py-2 border rounded-lg transition-all text-slate-800 focus:outline-none focus:ring-2 ${
            errors.name ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
          }`}
        />
        {errors.name && <span className="text-xs font-medium text-red-600">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="province-code" className="text-sm font-semibold text-slate-700">
          Código
        </label>
        <input
          id="province-code"
          type="text"
          placeholder="Ej: CBA"
          {...register('code')}
          className={`w-full px-3 py-2 border rounded-lg transition-all text-slate-800 uppercase focus:outline-none focus:ring-2 ${
            errors.code ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'
          }`}
        />
        {errors.code && <span className="text-xs font-medium text-red-600">{errors.code.message}</span>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Guardando…' : 'Guardar provincia'}
        </Button>
      </div>
    </form>
  )
}