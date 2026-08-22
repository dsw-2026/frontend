import { Link } from 'react-router-dom'
import type { Mascota } from '../../models/mascota'
import { API_ORIGIN } from '../../api/httpClient'
import './MascotaCard.css'

interface MascotaCardProps {
  mascota: Mascota
}

const TAMANIO_TEXTO: Record<string, string> = {
  PEQUENIO: 'Pequeño',
  MEDIANO: 'Mediano',
  GRANDE: 'Grande',
  GIGANTE: 'Gigante',
}

// Distinto a MascotaTable a propósito: esta es la vista "para adoptar"
// (pública, sin Editar/Eliminar), no la de gestión interna. Por eso es
// un componente separado en vez de reusar la tabla con props condicionales.
export function MascotaCard({ mascota }: MascotaCardProps) {
  const fotoUrl = mascota.foto ? (mascota.foto.startsWith('http') ? mascota.foto : `${API_ORIGIN}${mascota.foto}`) : null

  return (
    <article className="mascota-card">
      {fotoUrl ? (
        <img src={fotoUrl} alt={mascota.nombre} className="mascota-card-foto" />
      ) : (
        <div className="mascota-card-foto-placeholder" aria-hidden="true">
          🐾
        </div>
      )}
      <div className="mascota-card-body">
        <h3>{mascota.nombre}</h3>
        <p className="mascota-card-meta">
          {mascota.especie.nombre} · {mascota.edad} {mascota.unidadEdad === 'MESES' ? 'meses' : 'años'} ·{' '}
          {TAMANIO_TEXTO[mascota.caracteristica.tamanio]}
        </p>
        <p className="mascota-card-caracter">{mascota.caracteristica.caracter}</p>
        <Link to={`/solicitudes/nueva?mascota=${mascota.id}`} className="btn btn-primary">
          Solicitar adopción
        </Link>
      </div>
    </article>
  )
}
