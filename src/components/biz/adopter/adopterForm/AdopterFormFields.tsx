import { useState, type FormEvent } from 'react'
import { Button } from '../../../shared/ui/button/Button'
import { PhotoUpload } from '../../../shared/ui/photoUpload/PhotoUpload'
import { HousingType, type AdopterInput } from '../../../../models/adopter'
import type { Locality } from '../../../../models/locality'
import { HOUSING_TYPE_LABELS, type AdopterFormValues } from './AdopterForm.data'

interface AdopterFormFieldsProps {
  initialValues?: AdopterFormValues
  localities: Locality[]
  isEdit: boolean
  onSubmit: (values: AdopterInput) => void
  submitting: boolean
  fieldErrors?: Record<string, string>
}

export function AdopterFormFields({
  initialValues,
  localities,
  isEdit,
  onSubmit,
  submitting,
  fieldErrors = {},
}: AdopterFormFieldsProps) {
  const [username, setUsername] = useState(initialValues?.username ?? '')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState(initialValues?.firstName ?? '')
  const [lastName, setLastName] = useState(initialValues?.lastName ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [phone, setPhone] = useState(initialValues?.phone ?? '')
  const [address, setAddress] = useState(initialValues?.address ?? '')
  const [localityId, setLocalityId] = useState(initialValues ? String(initialValues.localityId) : '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [profilePhoto, setProfilePhoto] = useState(initialValues?.profilePhoto ?? '')
  const [verified, setVerified] = useState(initialValues?.verified ?? false)
  const [occupation, setOccupation] = useState(initialValues?.occupation ?? '')
  const [housingType, setHousingType] = useState(initialValues?.housingType ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      username: username.trim(),
      password: password ? password : undefined,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      description: description.trim() || undefined,
      address: address.trim() || undefined,
      profilePhoto: profilePhoto.trim() || undefined,
      locality: localityId ? Number(localityId) : undefined,
      verified,
      occupation: occupation.trim() || undefined,
      housingType: housingType || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form form-wide">
      <h2 className="form-section-title">Cuenta</h2>
      <label className="form-field">
        <span>Nombre de usuario</span>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          autoFocus
          className={fieldErrors.username ? 'input-error' : undefined}
        />
        {fieldErrors.username && <span className="field-error-text">{fieldErrors.username}</span>}
      </label>
      <label className="form-field">
        <span>{isEdit ? 'Nueva contraseña (dejar vacío para no cambiarla)' : 'Contraseña'}</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
        <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
      </label>
      <label className="form-field">
        <span>Apellido</span>
        <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
      </label>
      <label className="form-field">
        <span>Teléfono</span>
        <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </label>
      <label className="form-field">
        <span>Dirección</span>
        <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
      </label>
      <label className="form-field">
        <span>Localidad</span>
        <select value={localityId} onChange={(event) => setLocalityId(event.target.value)}>
          <option value="">Sin especificar</option>
          {localities.map((locality) => (
            <option key={locality.id} value={locality.id}>
              {locality.name} ({locality.province.name})
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Descripción</span>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />
      </label>
      <label className="form-field">
        <span>Foto de perfil</span>
        <PhotoUpload value={profilePhoto} onChange={setProfilePhoto} label="foto" />
      </label>

      <h2 className="form-section-title">Datos de Adoptante</h2>
      {isEdit && (
        <label className="form-field form-field-checkbox">
          <input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} />
          <span>
            Verificado
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
        <select
          value={housingType}
          onChange={(event) => setHousingType(event.target.value as HousingType | '')}
        >
          <option value="">Sin especificar</option>
          {Object.values(HousingType).map((value) => (
            <option key={value} value={value}>
              {HOUSING_TYPE_LABELS[value]}
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