import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/Button'
import { FotoUpload } from '@/shared/components/ui/PhotoUpload'
import { useLocalityList } from '@/features/locality/useLocalities'
import { HousingType, type AdopterInput } from '../adopter.model'

const HOUSING_LABELS: Record<HousingType, string> = { HOUSE: 'Casa', APARTMENT: 'Departamento', OTHER: 'Otro' }

function buildSchema(isEdit: boolean) {
  return z.object({
    username: z.string().min(1, 'El nombre de usuario es obligatorio'),
    password: isEdit ? z.string().optional() : z.string().min(6, 'Mínimo 6 caracteres'),
    email: z.string().email('Email inválido'),
    firstName: z.string().min(1, 'Obligatorio'),
    lastName: z.string().min(1, 'Obligatorio'),
    phone: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    profilePhoto: z.string().optional(),
    locality: z.coerce.number().optional(),
    verified: z.boolean().optional(),
    occupation: z.string().optional(),
    housingType: z.string().optional(),
    hasYard: z.boolean().optional(),
    hasOtherAnimals: z.boolean().optional(),
    otherAnimalsDetail: z.string().optional(),
    hasChildren: z.boolean().optional(),
  })
}

type FormValues = z.input<ReturnType<typeof buildSchema>>

interface Props {
  initialValues?: Partial<FormValues>
  isEdit: boolean
  onSubmit: (values: AdopterInput) => void
  submitting: boolean
}

const inputCls = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const chkCls = 'flex items-center gap-2 text-sm text-slate-700 cursor-pointer'

export function AdopterForm({ initialValues, isEdit, onSubmit, submitting }: Props) {
  const { data: localities = [] } = useLocalityList()
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(isEdit)),
    defaultValues: { ...initialValues },
  })

  const profilePhoto = useWatch({ control, name: 'profilePhoto' })

  const submit = handleSubmit((val) => {
    onSubmit({
      ...val,
      password: val.password || undefined,
      phone: val.phone || undefined,
      description: val.description || undefined,
      address: val.address || undefined,
      profilePhoto: val.profilePhoto || undefined,
      locality: val.locality ? Number(val.locality) : undefined,
      occupation: val.occupation || undefined,
      housingType: (val.housingType || undefined) as AdopterInput['housingType'],
      otherAnimalsDetail: val.otherAnimalsDetail || undefined,
    })
  })

  return (
    <form onSubmit={submit} className="max-w-2xl bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-6">
      {/* Cuenta */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800 border-b pb-1">Cuenta</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600">Usuario</label>
            <input {...register('username')} className={inputCls} />
            {errors.username && <span className="text-xs text-red-500">{errors.username.message}</span>}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">{isEdit ? 'Nueva contraseña' : 'Contraseña'}</label>
            <input type="password" {...register('password')} className={inputCls} />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Email</label>
            <input type="email" {...register('email')} className={inputCls} />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>
        </div>
      </div>

      {/* Datos Personales */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800 border-b pb-1">Datos personales</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-600">Nombre</label>
            <input {...register('firstName')} className={inputCls} />
            {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Apellido</label>
            <input {...register('lastName')} className={inputCls} />
            {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
          </div>
          <input type="tel" placeholder="Teléfono" {...register('phone')} className={inputCls} />
          <input placeholder="Dirección" {...register('address')} className={inputCls} />
          <select {...register('locality')} className={`${inputCls} sm:col-span-2`}>
            <option value="">Localidad...</option>
            {localities.map((l) => <option key={l.id} value={l.id}>{l.name} ({l.province?.name})</option>)}
          </select>
          <textarea placeholder="Descripción" {...register('description')} rows={2} className={`${inputCls} sm:col-span-2`} />
          <div className="sm:col-span-2">
            <FotoUpload value={profilePhoto ?? ''} onChange={(url) => setValue('profilePhoto', url)} label="foto" />
          </div>
        </div>
      </div>

      {/* Adoptante */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800 border-b pb-1">Datos de adoptante</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <input placeholder="Ocupación" {...register('occupation')} className={inputCls} />
          <select {...register('housingType')} className={inputCls}>
            <option value="">Tipo de vivienda...</option>
            {Object.values(HousingType).map((v) => <option key={v} value={v}>{HOUSING_LABELS[v]}</option>)}
          </select>

          <div className="flex flex-wrap gap-4 sm:col-span-2 pt-1">
            {isEdit && <label className={chkCls}><input type="checkbox" {...register('verified')} /> Verificado</label>}
            <label className={chkCls}><input type="checkbox" {...register('hasYard')} /> Tiene patio</label>
            <label className={chkCls}><input type="checkbox" {...register('hasChildren')} /> Tiene niños</label>
            <label className={chkCls}><input type="checkbox" {...register('hasOtherAnimals')} /> Otros animales</label>
          </div>

          <input placeholder="Detalle de otros animales" {...register('otherAnimalsDetail')} className={`${inputCls} sm:col-span-2`} />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando…' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}