import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { TipoPublicador, type PublicadorInput } from '../../models/publicador'
import type { Localidad } from '../../models/localidad'

interface PublicadorFormValues {
  nombreUsuario: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  descripcion: string
  direccion: string
  fotoPerfil: string
  localidadId: number | ''
  verificacion: boolean
  tipo: TipoPublicador | ''
  sitioWeb: string
  horariosAtencion: string
  instagram: string
  facebook: string
  whatsapp: string
}

interface PublicadorFormProps {
  initialValues?: PublicadorFormValues
  localidades: Localidad[]
  isEdit: boolean
  onSubmit: (values: PublicadorInput) => void
  submitting: boolean
  fieldErrors?: Record<string, string>
}

const TIPO_LABELS: Record<TipoPublicador, string> = {
  [TipoPublicador.REFUGIO]: 'Refugio',
  [TipoPublicador.RESCATISTA_INDEPENDIENTE]: 'Rescatista independiente',
  [TipoPublicador.HOGAR_DE_TRANSITO]: 'Hogar de tránsito',
}

export function PublicadorForm({
  initialValues,
  localidades,
  isEdit,
  onSubmit,
  submitting,
  fieldErrors = {},
}: PublicadorFormProps) {
  const [nombreUsuario, setNombreUsuario] = useState(initialValues?.nombreUsuario ?? '')
  const [contrasena, setContrasena] = useState('')
  const [nombre, setNombre] = useState(initialValues?.nombre ?? '')
  const [apellido, setApellido] = useState(initialValues?.apellido ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [telefono, setTelefono] = useState(initialValues?.telefono ?? '')
  const [direccion, setDireccion] = useState(initialValues?.direccion ?? '')
  const [localidadId, setLocalidadId] = useState(initialValues ? String(initialValues.localidadId) : '')
  const [verificacion, setVerificacion] = useState(initialValues?.verificacion ?? false)
  const [descripcion, setDescripcion] = useState(initialValues?.descripcion ?? '')
  const [fotoPerfil, setFotoPerfil] = useState(initialValues?.fotoPerfil ?? '')
  const [tipo, setTipo] = useState(initialValues?.tipo ?? '')
  const [sitioWeb, setSitioWeb] = useState(initialValues?.sitioWeb ?? '')
  const [horariosAtencion, setHorariosAtencion] = useState(initialValues?.horariosAtencion ?? '')
  const [instagram, setInstagram] = useState(initialValues?.instagram ?? '')
  const [facebook, setFacebook] = useState(initialValues?.facebook ?? '')
  const [whatsapp, setWhatsapp] = useState(initialValues?.whatsapp ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    // El backend guarda redesSociales como un JSON libre (Record<string,
    // string>), pero acá lo armamos a partir de 3 campos fijos: solo se
    // incluye la clave si la persona completó ese campo, y si ninguno
    // tiene valor se manda undefined (no un objeto vacío).
    const redesSociales: Record<string, string> = {}
    if (instagram.trim()) redesSociales.instagram = instagram.trim()
    if (facebook.trim()) redesSociales.facebook = facebook.trim()
    if (whatsapp.trim()) redesSociales.whatsapp = whatsapp.trim()

    onSubmit({
      nombreUsuario: nombreUsuario.trim(),
      // Si es edición y se dejó en blanco, no se manda la clave: JSON.stringify
      // omite las claves con valor undefined, y el backend conserva la
      // contraseña actual (ver comentario en publicador.controller.ts).
      contrasena: contrasena ? contrasena : undefined,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim(),
      telefono: telefono.trim() || undefined,
      descripcion: descripcion.trim() || undefined,
      direccion: direccion.trim() || undefined,
      fotoPerfil: fotoPerfil.trim() || undefined,
      localidad: localidadId ? Number(localidadId) : undefined,
      verificacion,
      tipo: tipo || undefined,
      sitioWeb: sitioWeb.trim() || undefined,
      horariosAtencion: horariosAtencion.trim() || undefined,
      redesSociales: Object.keys(redesSociales).length > 0 ? redesSociales : undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form form-wide">
      <h2 className="form-section-title">Cuenta</h2>
      <label className="form-field">
        <span>Nombre de usuario</span>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(event) => setNombreUsuario(event.target.value)}
          required
          autoFocus
          className={fieldErrors.nombreUsuario ? 'input-error' : undefined}
        />
        {fieldErrors.nombreUsuario && <span className="field-error-text">{fieldErrors.nombreUsuario}</span>}
      </label>
      <label className="form-field">
        <span>{isEdit ? 'Nueva contraseña (dejar vacío para no cambiarla)' : 'Contraseña'}</span>
        <input
          type="password"
          value={contrasena}
          onChange={(event) => setContrasena(event.target.value)}
          required={!isEdit}
          minLength={6}
        />
      </label>
      <label className="form-field">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className={fieldErrors.email ? 'input-error' : undefined}
        />
        {fieldErrors.email && <span className="field-error-text">{fieldErrors.email}</span>}
      </label>

      <h2 className="form-section-title">Datos personales</h2>
      <label className="form-field">
        <span>Nombre</span>
        <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
      </label>
      <label className="form-field">
        <span>Apellido</span>
        <input type="text" value={apellido} onChange={(event) => setApellido(event.target.value)} required />
      </label>
      <label className="form-field">
        <span>Teléfono</span>
        <input type="tel" value={telefono} onChange={(event) => setTelefono(event.target.value)} />
      </label>
      <label className="form-field">
        <span>Dirección</span>
        <input type="text" value={direccion} onChange={(event) => setDireccion(event.target.value)} />
      </label>
      <label className="form-field">
        <span>Localidad</span>
        <select value={localidadId} onChange={(event) => setLocalidadId(event.target.value)}>
          <option value="">Sin especificar</option>
          {localidades.map((localidad) => (
            <option key={localidad.id} value={localidad.id}>
              {localidad.nombre} ({localidad.provincia.nombre})
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Descripción</span>
        <textarea value={descripcion} onChange={(event) => setDescripcion(event.target.value)} rows={3} />
      </label>
      <label className="form-field">
        <span>Foto de perfil (URL)</span>
        <input type="url" value={fotoPerfil} onChange={(event) => setFotoPerfil(event.target.value)} />
      </label>

      <h2 className="form-section-title">Datos de Publicador</h2>
      {isEdit && (
        <label className="form-field form-field-checkbox">
          <input type="checkbox" checked={verificacion} onChange={(event) => setVerificacion(event.target.checked)} />
          <span>
            Verificado
            <small> — temporal: cualquiera puede tocar esto hasta que exista control por rol</small>
          </span>
        </label>
      )}
      <label className="form-field">
        <span>Tipo</span>
        <select value={tipo} onChange={(event) => setTipo(event.target.value as TipoPublicador | '')}>
          <option value="">Sin especificar</option>
          {Object.values(TipoPublicador).map((valor) => (
            <option key={valor} value={valor}>
              {TIPO_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Sitio web</span>
        <input type="url" value={sitioWeb} onChange={(event) => setSitioWeb(event.target.value)} />
      </label>
      <label className="form-field">
        <span>Horarios de atención</span>
        <input type="text" value={horariosAtencion} onChange={(event) => setHorariosAtencion(event.target.value)} />
      </label>
      <label className="form-field">
        <span>Instagram (opcional)</span>
        <input
          type="url"
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
          placeholder="https://instagram.com/turefugio"
        />
      </label>
      <label className="form-field">
        <span>Facebook (opcional)</span>
        <input
          type="url"
          value={facebook}
          onChange={(event) => setFacebook(event.target.value)}
          placeholder="https://facebook.com/turefugio"
        />
      </label>
      <label className="form-field">
        <span>WhatsApp (opcional)</span>
        <input
          type="text"
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          placeholder="+54 341 555-5555"
        />
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar'}
      </Button>
    </form>
  )
}
