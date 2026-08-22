import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { API_ORIGIN } from '../../api/httpClient'
import { Energia, Tamanio, Tolerancia } from '../../models/mascota'
import type { SolicitudInput } from '../../models/solicitud'
import type { Mascota } from '../../models/mascota'
import type { Adoptante } from '../../models/adoptante'

interface SolicitudFormProps {
  // Si viene una mascota fija (desde /adoptar → "Solicitar adopción"), se
  // muestra como tarjeta de solo lectura en vez de un <select> — ya la
  // eligió antes de llegar acá, no tiene sentido preguntarla de nuevo.
  mascotaFija?: Mascota
  // Si NO hay mascota fija (acceso directo al formulario, ej. desde el
  // panel interno), se ofrece el <select> de siempre con esta lista.
  mascotasDisponibles?: Mascota[]
  adoptantes: Adoptante[]
  onSubmit: (values: SolicitudInput) => void
  submitting: boolean
}

const ENERGIA_LABELS: Record<Energia, string> = { BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta' }
const TAMANIO_LABELS: Record<Tamanio, string> = {
  PEQUENIO: 'Pequeño',
  MEDIANO: 'Mediano',
  GRANDE: 'Grande',
  GIGANTE: 'Gigante',
}
const TOLERANCIA_LABELS: Record<Tolerancia, string> = { SI: 'Sí', NO: 'No', DESCONOCIDO: 'No me importa' }

export function SolicitudForm({
  mascotaFija,
  mascotasDisponibles = [],
  adoptantes,
  onSubmit,
  submitting,
}: SolicitudFormProps) {
  const [mascotaId, setMascotaId] = useState(mascotaFija ? String(mascotaFija.id) : '')
  const [adoptanteId, setAdoptanteId] = useState('')
  const [mensaje, setMensaje] = useState('')

  // Preferencias del adoptante para ESTA solicitud puntual. Se comparan
  // contra Caracteristica al vuelo, no se persiste ningún puntaje — ver
  // calcularDesglose en el frontend.
  const [energiaDeseada, setEnergiaDeseada] = useState<Energia>(Energia.MEDIA)
  const [tamanioDeseado, setTamanioDeseado] = useState<Tamanio>(Tamanio.MEDIANO)
  const [toleraNinosDeseado, setToleraNinosDeseado] = useState<Tolerancia>(Tolerancia.DESCONOCIDO)
  const [toleraAnimalesDeseado, setToleraAnimalesDeseado] = useState<Tolerancia>(Tolerancia.DESCONOCIDO)
  const [toleraEncierroDeseado, setToleraEncierroDeseado] = useState<Tolerancia>(Tolerancia.DESCONOCIDO)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      mascota: Number(mascotaId),
      adoptante: Number(adoptanteId),
      mensaje: mensaje.trim() || undefined,
      energiaDeseada,
      tamanioDeseado,
      toleraNinosDeseado,
      toleraAnimalesDeseado,
      toleraEncierroDeseado,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form form-wide">
      {mascotaFija ? (
        <div className="mascota-fija-card">
          {mascotaFija.foto && (
            <img
              src={mascotaFija.foto.startsWith('http') ? mascotaFija.foto : `${API_ORIGIN}${mascotaFija.foto}`}
              alt={mascotaFija.nombre}
            />
          )}
          <div>
            <strong>{mascotaFija.nombre}</strong>
            <span> ({mascotaFija.especie.nombre})</span>
            <Link to="/adoptar" className="mascota-fija-cambiar">
              Elegir otra mascota
            </Link>
          </div>
        </div>
      ) : (
        <label className="form-field">
          <span>Mascota</span>
          <select value={mascotaId} onChange={(event) => setMascotaId(event.target.value)} required autoFocus>
            <option value="" disabled>
              Seleccioná una mascota disponible
            </option>
            {mascotasDisponibles.map((mascota) => (
              <option key={mascota.id} value={mascota.id}>
                {mascota.nombre} ({mascota.especie.nombre})
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="form-field">
        <span>Adoptante</span>
        <select
          value={adoptanteId}
          onChange={(event) => setAdoptanteId(event.target.value)}
          required
          autoFocus={Boolean(mascotaFija)}
        >
          <option value="" disabled>
            Seleccioná un adoptante
          </option>
          {adoptantes.map((adoptante) => (
            <option key={adoptante.id} value={adoptante.id}>
              {adoptante.nombre} {adoptante.apellido}
            </option>
          ))}
        </select>
      </label>

      <h2 className="form-section-title">¿Qué buscás en tu mascota?</h2>
      <label className="form-field">
        <span>Nivel de energía que buscás</span>
        <select value={energiaDeseada} onChange={(event) => setEnergiaDeseada(event.target.value as Energia)}>
          {Object.values(Energia).map((valor) => (
            <option key={valor} value={valor}>
              {ENERGIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Tamaño que buscás</span>
        <select value={tamanioDeseado} onChange={(event) => setTamanioDeseado(event.target.value as Tamanio)}>
          {Object.values(Tamanio).map((valor) => (
            <option key={valor} value={valor}>
              {TAMANIO_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>¿Buscás que tolere niños?</span>
        <select
          value={toleraNinosDeseado}
          onChange={(event) => setToleraNinosDeseado(event.target.value as Tolerancia)}
        >
          {Object.values(Tolerancia).map((valor) => (
            <option key={valor} value={valor}>
              {TOLERANCIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>¿Buscás que tolere otros animales?</span>
        <select
          value={toleraAnimalesDeseado}
          onChange={(event) => setToleraAnimalesDeseado(event.target.value as Tolerancia)}
        >
          {Object.values(Tolerancia).map((valor) => (
            <option key={valor} value={valor}>
              {TOLERANCIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>¿Buscás que tolere el encierro?</span>
        <select
          value={toleraEncierroDeseado}
          onChange={(event) => setToleraEncierroDeseado(event.target.value as Tolerancia)}
        >
          {Object.values(Tolerancia).map((valor) => (
            <option key={valor} value={valor}>
              {TOLERANCIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field">
        <span>Mensaje (opcional)</span>
        <textarea
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          rows={3}
          placeholder="Por qué le interesa esta mascota, algo para contarle al publicador..."
        />
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Enviando…' : 'Enviar solicitud'}
      </Button>
    </form>
  )
}
