import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/Button'
import { FotoUpload } from '@/shared/components/ui/PhotoUpload'
import { useLocalityList } from '@/features/locality/useLocalities'
import { PublisherType, type PublisherInput } from '../publisher.model'

const PUBLISHER_TYPE_LABELS: Record<PublisherType, string> = {
  SHELTER: 'Refugio',
  INDEPENDENT_RESCUER: 'Rescatista independiente',
  FOSTER_HOME: 'Hogar de tránsito',
}

function buildSchema(isEdit: boolean) {
  return z.object({
    username: z.string().min(1, { message: 'El nombre de usuario es obligatorio' }),
    password: isEdit
      ? z.string().optional()
      : z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    email: z.string().email({ message: 'El email no es válido' }),
    firstName: z.string().min(1, { message: 'El nombre es obligatorio' }),
    lastName: z.string().min(1, { message: 'El apellido es obligatorio' }),
    phone: z.string().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
    profilePhoto: z.string().optional(),
    locality: z.coerce.number().int().positive().optional(),
    verified: z.boolean().optional(),
    type: z.string().optional(),
    website: z.string().optional(),
    openingHours: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    whatsapp: z.string().optional(),
  })
}

type FormValues = z.input<ReturnType<typeof buildSchema>>

interface PublisherFormProps {
  initialValues?: Partial<FormValues>
  isEdit: boolean
  onSubmit: (values: PublisherInput) => void
  submitting: boolean
}

const inputClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
const labelClass = 'text-sm font-semibold text-slate-700'
const sectionClass = 'text-lg font-bold text-slate-900 border-b border-slate-100 pb-2'

export function PublisherForm({ initialValues, isEdit, onSubmit, submitting }: PublisherFormProps) {
  const { data: localities = [] } = useLocalityList()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(isEdit)),
    defaultValues: {
      username: '', password: '', email: '', firstName: '', lastName: '',
      phone: '', description: '', address: '', profilePhoto: '',
      verified: false, type: '', website: '', openingHours: '',
      instagram: '', facebook: '', whatsapp: '',
      ...initialValues,
    },
  })

  const profilePhoto = useWatch({ control, name: 'profilePhoto' })

  const submit = handleSubmit((values) => {
    const socialMedia: Record<string, string> = {}
    if (values.instagram?.trim()) socialMedia.instagram = values.instagram.trim()
    if (values.facebook?.trim()) socialMedia.facebook = values.facebook.trim()
    if (values.whatsapp?.trim()) socialMedia.whatsapp = values.whatsapp.trim()

    onSubmit({
      username: values.username,
      password: values.password || undefined,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone || undefined,
      description: values.description || undefined,
      address: values.address || undefined,
      profilePhoto: values.profilePhoto || undefined,
      locality: values.locality ? Number(values.locality) : undefined,
      verified: values.verified,
      type: (values.type || undefined) as PublisherInput['type'],
      website: values.website || undefined,
      openingHours: values.openingHours || undefined,
      socialMedia: Object.keys(socialMedia).length > 0 ? socialMedia : undefined,
    })
  })

  return (
    <form onSubmit={submit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <h2 className={sectionClass}>Cuenta</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Nombre de usuario</label>
          <input autoFocus {...register('username')} className={inputClass} />
          {errors.username && <span className="text-xs text-red-600">{errors.username.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>{isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'}</label>
          <input type="password" {...register('password')} className={inputClass} />
          {errors.password && <span className="text-xs text-red-600">{errors.password.message}</span>}
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Email</label>
          <input type="email" {...register('email')} className={inputClass} />
          {errors.email && <span className="text-xs text-red-600">{errors.email.message}</span>}
        </div>
      </div>

      <h2 className={sectionClass}>Datos personales</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Nombre</label>
          <input {...register('firstName')} className={inputClass} />
          {errors.firstName && <span className="text-xs text-red-600">{errors.firstName.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Apellido</label>
          <input {...register('lastName')} className={inputClass} />
          {errors.lastName && <span className="text-xs text-red-600">{errors.lastName.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Teléfono</label>
          <input type="tel" {...register('phone')} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Dirección</label>
          <input {...register('address')} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Localidad</label>
          <select {...register('locality')} className={inputClass}>
            <option value="">Sin especificar</option>
            {localities.map((l) => (
              <option key={l.id} value={l.id}>{l.name} ({l.province?.name})</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Descripción</label>
          <textarea {...register('description')} rows={3} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Foto de perfil</label>
          <FotoUpload value={profilePhoto ?? ''} onChange={(url) => setValue('profilePhoto', url)} label="foto" />
        </div>
      </div>

      <h2 className={sectionClass}>Datos de publicador</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {isEdit && (
          <label className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" {...register('verified')} />
            <span className="text-sm text-slate-700">Verificado</span>
          </label>
        )}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Tipo</label>
          <select {...register('type')} className={inputClass}>
            <option value="">Sin especificar</option>
            {Object.values(PublisherType).map((v) => (
              <option key={v} value={v}>{PUBLISHER_TYPE_LABELS[v]}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Sitio web</label>
          <input type="url" {...register('website')} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass}>Horarios de atención</label>
          <input {...register('openingHours')} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Instagram (opcional)</label>
          <input type="url" {...register('instagram')} placeholder="https://instagram.com/..." className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Facebook (opcional)</label>
          <input type="url" {...register('facebook')} placeholder="https://facebook.com/..." className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>WhatsApp (opcional)</label>
          <input {...register('whatsapp')} placeholder="+54 341 555-5555" className={inputClass} />
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