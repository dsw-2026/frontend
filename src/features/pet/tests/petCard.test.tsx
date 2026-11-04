import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PetCard } from '../components/PetCard'
import type { Pet } from '../pet.model'

// Fake pet. Partial<Pet> lets us override only some fields; the final cast
// avoids having to fill every field of the Pet model.
const crearMascota = (overrides: Partial<Pet> = {}): Pet =>
  ({
    id: 7,
    name: 'Firulais',
    photo: undefined,
    age: 3,
    ageUnit: 'YEARS',
    species: { name: 'Perro' },
    characteristic: { size: 'MEDIUM', temperament: 'Juguetón y cariñoso' },
    ...overrides,
  }) as unknown as Pet

// PetCard uses <Link>, so it needs a Router around it.
const renderCard = (pet: Pet) =>
  render(
    <MemoryRouter>
      <PetCard pet={pet} />
    </MemoryRouter>,
  )

describe('PetCard', () => {
  it('muestra nombre, especie, edad, tamaño y temperamento', () => {
    renderCard(crearMascota())

    expect(screen.getByRole('heading', { name: 'Firulais' })).toBeInTheDocument()
    expect(screen.getByText(/Perro · 3 años · Mediano/)).toBeInTheDocument()
    expect(screen.getByText('Juguetón y cariñoso')).toBeInTheDocument()
  })

  it('muestra la edad en meses cuando ageUnit es MONTHS', () => {
    renderCard(crearMascota({ age: 8, ageUnit: 'MONTHS' }))

    expect(screen.getByText(/8 meses/)).toBeInTheDocument()
  })

  it('muestra la foto si la mascota tiene una URL', () => {
    renderCard(crearMascota({ photo: 'https://ejemplo.com/firulais.jpg' }))

    expect(screen.getByRole('img', { name: 'Firulais' })).toHaveAttribute(
      'src',
      'https://ejemplo.com/firulais.jpg',
    )
  })

  it('no muestra imagen si no hay foto', () => {
    renderCard(crearMascota({ photo: undefined }))

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('los links apuntan a la solicitud de adopción y al detalle', () => {
    renderCard(crearMascota())

    expect(screen.getByRole('link', { name: 'Solicitar adopción' })).toHaveAttribute(
      'href',
      '/applications/new?pet=7',
    )
    expect(screen.getByRole('link', { name: 'Detalle' })).toHaveAttribute('href', '/adopt/7')
  })
})