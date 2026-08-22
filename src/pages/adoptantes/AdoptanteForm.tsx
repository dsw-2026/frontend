import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { FotoUpload } from '../../components/ui/FotoUpload'
import { TipoVivienda, type AdoptanteInput } from '../../models/adoptante'
import type { Localidad } from '../../models/localidad'

interface AdoptanteFormValues {
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
  occupation: string
  tipoVivienda: TipoVivienda | ''
}

interface AdoptanteFormProps {
  initialValues?: AdoptanteFormValues
  localidades: Localidad[]
  isEdit: boolean
  onSubmit: (values: AdoptanteInput) => void
  submitting: boolean
  // Igual que en PublicadorForm: si el backend devolvió un 409 de
  // unicidad, acá llega qué campo fue ("nombreUsuario" o "email") para
  // marcarlo en rojo puntualmente.
  fieldErrors?: Record<string, string>
}

const TIPO_VIVIENDA_LABELS: Record<TipoVivienda, string> = {
  [TipoVivienda.CASA]: 'Casa',
  [TipoVivienda.DEPARTAMENTO]: 'Departamento',
  [TipoVivienda.OTRO]: 'Otro',
}

export function AdoptanteForm({
  initialValues,
  localidades,
  isEdit,
  onSubmit,
  submitting,
  fieldErrors = {},
}: AdoptanteFormProps) {
  const [nombreUsuario, setNombreUsuario] = useState(initialValues?.nombreUsuario ?? '')
  const [contrasena, setContrasena] = useState('')
  const [nombre, setNombre] = useState(initialValues?.nombre ?? '')
  const [apellido, setApellido] = useState(initialValues?.apellido ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [telefono, setTelefono] = useState(initialValues?.telefono ?? '')
  const [direccion, setDireccion] = useState(initialValues?.direccion ?? '')
  const [localidadId, setLocalidadId] = useState(initialValues ? String(initialValues.localidadId) : '')
  const [descripcion, setDescripcion] = useState(initialValues?.descripcion ?? '')
  const [fotoPerfil, setFotoPerfil] = useState(initialValues?.fotoPerfil ?? '')
  const [verificacion, setVerificacion] = useState(initialValues?.verificacion ?? false)
  const [occupation, setOccupation] = useState(initialValues?.occupation ?? '')
  const [tipoVivienda, setTipoVivienda] = useState(initialValues?.tipoVivienda ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      nombreUsuario: nombreUsuario.trim(),
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
      occupation: occupation.trim() || undefined,
      tipoVivienda: tipoVivienda || undefined,
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
        <span>Foto de perfil</span>
        <FotoUpload value={fotoPerfil} onChange={setFotoPerfil} label="foto" />
      </label>

      <h2 className="form-section-title">Datos de Adoptante</h2>
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
        <span>Ocupación</span>
        <input
          type="text"
          value={occupation}
          onChange={(event) => setOccupation(event.target.value)}
          placeholder="Ej: Docente"
        />
      </label>
      <label className="form-field">
        <span>Tipo de vivienda</span>
        <select value={tipoVivienda} onChange={(event) => setTipoVivienda(event.target.value as TipoVivienda | '')}>
          <option value="">Sin especificar</option>
          {Object.values(TipoVivienda).map((valor) => (
            <option key={valor} value={valor}>
              {TIPO_VIVIENDA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar'}
      </Button>
    </form>
  )
}
