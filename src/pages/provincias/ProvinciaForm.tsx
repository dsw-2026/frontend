import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import type { ProvinciaInput } from '../../models/provincia'

interface ProvinciaFormProps {
  initialValues?: ProvinciaInput
  onSubmit: (values: ProvinciaInput) => void
  submitting: boolean
}

export function ProvinciaForm({ initialValues, onSubmit, submitting }: ProvinciaFormProps) {
  const [nombre, setNombre] = useState(initialValues?.nombre ?? '')
  const [codigo, setCodigo] = useState(initialValues?.codigo ?? '')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // El backend guarda codigo tal cual se lo mande; lo normalizamos acá
    // a mayúsculas para que "cba" y "CBA" no generen entradas distintas
    // y choquen contra el unique: true de la entidad sin que el usuario
    // entienda por qué.
    onSubmit({ nombre: nombre.trim(), codigo: codigo.trim().toUpperCase() })
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
          placeholder="Ej: Córdoba"
          autoFocus
        />
      </label>

      <label className="form-field">
        <span>Código</span>
        <input
          type="text"
          value={codigo}
          onChange={(event) => setCodigo(event.target.value)}
          required
          minLength={2}
          maxLength={4}
          placeholder="Ej: CBA"
        />
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar'}
      </Button>
    </form>
  )
}
