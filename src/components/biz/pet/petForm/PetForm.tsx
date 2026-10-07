import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiError } from '../../../../api/httpClient'
import type { Pet, PetInput } from '../../../../models/pet'
import type { Species } from '../../../../models/species'
import { PetFormFields } from './PetFormFields'
import { petToFormValues } from './PetForm.data'
import { loadPetFormData, savePet } from './PetForm.server'

export function PetForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [pet, setPet] = useState<Pet | null>(null)
  const [speciesList, setSpeciesList] = useState<Species[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadPetFormData(id ? Number(id) : undefined)
      .then(({ speciesList, pet }) => {
        if (cancelled) return
        setSpeciesList(speciesList)
        setPet(pet)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudo cargar la información necesaria')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  async function handleSubmit(values: PetInput) {
    setSubmitting(true)
    setError(null)
    try {
      await savePet(id ? Number(id) : undefined, values)
      navigate('/pets')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la mascota')
      setSubmitting(false)
    }
  }

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <Link to="/pets" className="back-link">
        ← Volver a mascotas
      </Link>
      <h1>{isEdit ? 'Editar mascota' : 'Nueva mascota'}</h1>
      {error && <p className="error-message">{error}</p>}

      {speciesList.length === 0 ? (
        <p className="empty-state">
          Todavía no hay ninguna especie cargada. <Link to="/species/new">Creá una primero</Link> para poder cargar
          una mascota.
        </p>
      ) : (
        <PetFormFields
          initialValues={pet ? petToFormValues(pet) : undefined}
          speciesList={speciesList}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </section>
  )
}