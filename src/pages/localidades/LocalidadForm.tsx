import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import type { LocalidadInput } from '../../models/localidad'
import type { Provincia } from '../../models/provincia'

interface LocalidadFormValues {
  nombre: string
  codigoPostal: string
  provinciaId: number
}

interface LocalidadFormProps {
  initialValues?: LocalidadFormValues
  provincias: Provincia[]
  onSubmit: (values: LocalidadInput) => void
  submitting: boolean
}

// Sigue siendo "dumb": recibe las provincias ya resueltas por props (la
// página, LocalidadFormPage, es quien decide de dónde salen). Este
// componente no sabe nada de services ni de la API.
export function LocalidadForm({ initialValues, provincias, onSubmit, submitting }: LocalidadFormProps) {
  const [nombre, setNombre] = useState(initialValues?.nombre ?? '')
  const [codigoPostal, setCodigoPostal] = useState(initialValues?.codigoPostal ?? '')
  // El <select> maneja strings; se convierte a número recién al enviar.
  const [provinciaId, setProvinciaId] = useState(initialValues ? String(initialValues.provinciaId) : '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      nombre: nombre.trim(),
      codigoPostal: codigoPostal.trim(),
      provincia: Number(provinciaId),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="form-field">
        <span>Nombre</span>
        <input
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          required
          minLength={2}
          placeholder="Ej: Rosario"
          autoFocus
        />
      </label>

      <label className="form-field">
        <span>Código postal</span>
        <input
          type="text"
          value={codigoPostal}
          onChange={(event) => setCodigoPostal(event.target.value)}
          required
          placeholder="Ej: 2000"
        />
      </label>

      <label className="form-field">
        <span>Provincia</span>
        <select value={provinciaId} onChange={(event) => setProvinciaId(event.target.value)} required>
          <option value="" disabled>
            Seleccioná una provincia
          </option>
          {provincias.map((provincia) => (
            <option key={provincia.id} value={provincia.id}>
              {provincia.nombre}
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
