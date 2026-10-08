import { useState, type FormEvent } from 'react'
import { Button } from '../../../shared/ui/button/Button'
import { PasswordInput } from '../../../shared/ui/passwordInput/PasswordInput'
import { PhotoUpload } from '../../../shared/ui/photoUpload/PhotoUpload'
import { PublisherType, type PublisherInput } from '../../../../models/publisher'
import type { Locality } from '../../../../models/locality'
import { PUBLISHER_TYPE_LABELS, type PublisherFormValues } from './PublisherForm.data'

interface PublisherFormFieldsProps {
  initialValues?: PublisherFormValues
  localities: Locality[]
  isEdit: boolean
  onSubmit: (values: PublisherInput) => void
  submitting: boolean
  fieldErrors?: Record<string, string>
}

export function PublisherFormFields({
  initialValues,
  localities,
  isEdit,
  onSubmit,
  submitting,
  fieldErrors = {},
}: PublisherFormFieldsProps) {
  const [username, setUsername] = useState(initialValues?.username ?? '')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState(initialValues?.firstName ?? '')
  const [lastName, setLastName] = useState(initialValues?.lastName ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [phone, setPhone] = useState(initialValues?.phone ?? '')
  const [address, setAddress] = useState(initialValues?.address ?? '')
  const [localityId, setLocalityId] = useState(initialValues ? String(initialValues.localityId) : '')
  const [verified, setVerified] = useState(initialValues?.verified ?? false)
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [profilePhoto, setProfilePhoto] = useState(initialValues?.profilePhoto ?? '')
  const [publisherType, setPublisherType] = useState(initialValues?.type ?? '')
  const [website, setWebsite] = useState(initialValues?.website ?? '')
  const [openingHours, setOpeningHours] = useState(initialValues?.openingHours ?? '')
  const [instagram, setInstagram] = useState(initialValues?.instagram ?? '')
  const [facebook, setFacebook] = useState(initialValues?.facebook ?? '')
  const [whatsapp, setWhatsapp] = useState(initialValues?.whatsapp ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const socialMedia: Record<string, string> = {}
    if (instagram.trim()) socialMedia.instagram = instagram.trim()
    if (facebook.trim()) socialMedia.facebook = facebook.trim()
    if (whatsapp.trim()) socialMedia.whatsapp = whatsapp.trim()

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
      type: publisherType || undefined,
      website: website.trim() || undefined,
      openingHours: openingHours.trim() || undefined,
      socialMedia: Object.keys(socialMedia).length > 0 ? socialMedia : undefined,
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
        <PasswordInput
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required={!isEdit}
          minLength={6}
          autoComplete="new-password"
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

      <h2 className="form-section-title">Datos de Publicador</h2>
      {isEdit && (
        <label className="form-field form-field-checkbox">
          <input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} />
          <span>
            Verificado
          </span>
        </label>
      )}
      <label className="form-field">
        <span>Tipo</span>
        <select
          value={publisherType}
          onChange={(event) => setPublisherType(event.target.value as PublisherType | '')}
        >
          <option value="">Sin especificar</option>
          {Object.values(PublisherType).map((value) => (
            <option key={value} value={value}>
              {PUBLISHER_TYPE_LABELS[value]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Sitio web</span>
        <input type="url" value={website} onChange={(event) => setWebsite(event.target.value)} />
      </label>
      <label className="form-field">
        <span>Horarios de atención</span>
        <input type="text" value={openingHours} onChange={(event) => setOpeningHours(event.target.value)} />
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