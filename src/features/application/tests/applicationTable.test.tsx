import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ApplicationTable } from '../components/ApplicationTable'
import { calculateBreakdown, totalCompatibility } from '../compatibility'
import { ApplicationStatus, type Application } from '../application.model'

// Builds a fake application. The pet's characteristic and the adopter's
// "desired" fields drive the compatibility calculation, so they are the
// interesting part to control in each test.
const crearSolicitud = (overrides: Partial<Application> = {}): Application =>
  ({
    id: 1,
    status: ApplicationStatus.PENDING,
    applicationDate: '2026-01-01',
    desiredEnergyLevel: 'MEDIUM',
    desiredSize: 'MEDIUM',
    desiredToleratesChildren: 'YES',
    desiredToleratesOtherAnimals: 'YES',
    desiredToleratesConfinement: 'NO',
    pet: {
      id: 10,
      name: 'Firulais',
      characteristic: {
        energyLevel: 'MEDIUM',
        size: 'MEDIUM',
        toleratesChildren: 'YES',
        toleratesOtherAnimals: 'YES',
        toleratesConfinement: 'NO',
      },
    },
    adopter: { firstName: 'Juan', lastName: 'Pérez' },
    ...overrides,
  }) as unknown as Application

const noop = () => {}

const renderTable = (props: Partial<React.ComponentProps<typeof ApplicationTable>> = {}) =>
  render(
    <MemoryRouter>
      <ApplicationTable
        applications={[crearSolicitud()]}
        canResolve={false}
        canDelete={false}
        onApprove={noop}
        onReject={noop}
        onDelete={noop}
        {...props}
      />
    </MemoryRouter>,
  )

// ---- Unit tests of the compatibility logic (the core algorithm) ----
describe('compatibility', () => {
  it('da 100% cuando todo lo que busca el adoptante coincide con la mascota', () => {
    const { points, total, percentage } = totalCompatibility(calculateBreakdown(crearSolicitud()))
    expect(points).toBe(5)
    expect(total).toBe(5)
    expect(percentage).toBe(100)
  })

  it('da 0% cuando nada coincide', () => {
    const app = crearSolicitud({
      desiredEnergyLevel: 'HIGH',
      desiredSize: 'SMALL',
      desiredToleratesChildren: 'NO',
      desiredToleratesOtherAnimals: 'NO',
      desiredToleratesConfinement: 'YES',
    })
    const { percentage } = totalCompatibility(calculateBreakdown(app))
    expect(percentage).toBe(0)
  })

  it('calcula el porcentaje parcial (3 de 5 = 60%)', () => {
    // Cambiamos 2 factores de 5 → deberían coincidir 3.
    const app = crearSolicitud({ desiredSize: 'LARGE', desiredToleratesChildren: 'NO' })
    const { points, percentage } = totalCompatibility(calculateBreakdown(app))
    expect(points).toBe(3)
    expect(percentage).toBe(60)
  })
})

// ---- Component tests of ApplicationTable ----
describe('ApplicationTable', () => {
  it('muestra un mensaje cuando no hay solicitudes', () => {
    renderTable({ applications: [] })
    expect(screen.getByText('Todavía no hay solicitudes.')).toBeInTheDocument()
  })

  it('muestra la mascota, el adoptante y la compatibilidad', () => {
    renderTable()
    expect(screen.getByText('Firulais')).toBeInTheDocument()
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('NO muestra los botones Aprobar/Rechazar cuando canResolve es false', () => {
    renderTable({ canResolve: false })
    expect(screen.queryByRole('button', { name: 'Aprobar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Rechazar' })).not.toBeInTheDocument()
  })

  it('muestra Aprobar/Rechazar cuando canResolve es true y la solicitud está pendiente', () => {
    renderTable({ canResolve: true })
    expect(screen.getByRole('button', { name: 'Aprobar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rechazar' })).toBeInTheDocument()
  })

  it('NO muestra Aprobar/Rechazar si la solicitud ya fue resuelta, aunque canResolve sea true', () => {
    renderTable({ canResolve: true, applications: [crearSolicitud({ status: ApplicationStatus.APPROVED })] })
    expect(screen.queryByRole('button', { name: 'Aprobar' })).not.toBeInTheDocument()
  })

  it('llama a onApprove con el id al tocar Aprobar', () => {
    const onApprove = vi.fn()
    renderTable({ canResolve: true, onApprove })
    fireEvent.click(screen.getByRole('button', { name: 'Aprobar' }))
    expect(onApprove).toHaveBeenCalledWith(1)
  })
})