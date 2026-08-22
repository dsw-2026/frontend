import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import type { EspecieInput } from '../../models/especie'

interface EspecieFormProps {
  initialValues?: EspecieInput
  onSubmit: (values: EspecieInput) => void
  submitting: boolean
}

// Componente "dumb": solo maneja el estado local del formulario y avisa
// al padre cuando se envía. No llama al service, no navega, no sabe si
// está creando o editando.
export function EspecieForm({ initialValues, onSubmit, submitting }: EspecieFormProps) {
  const [nombre, setNombre] = useState(initialValues?.nombre ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({ nombre: nombre.trim() })
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
          placeholder="Ej: Perro"
          autoFocus
        />
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar'}
      </Button>
    </form>
  )
}
