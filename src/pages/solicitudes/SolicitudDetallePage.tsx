import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { solicitudService } from '../../services/solicitud.service'
import { EstadoSolicitud, type Solicitud } from '../../models/solicitud'
import { AvatarZoom } from '../../components/ui/AvatarZoom'
import { Button } from '../../components/ui/Button'
import { ApiError } from '../../api/httpClient'
import { calcularDesglose } from './calcularDesglose'
import { totalCompatibilidad } from './compatibilidad'
import { useAuth } from '../../api/AuthContext'

const TOLERANCIA_TEXTO: Record<string, string> = { SI: 'Sí', NO: 'No', DESCONOCIDO: 'Desconocido' }
const TAMANIO_TEXTO: Record<string, string> = {
  PEQUENIO: 'Pequeño',
  MEDIANO: 'Mediano',
  GRANDE: 'Grande',
  GIGANTE: 'Gigante',
}
const ENERGIA_TEXTO: Record<string, string> = { BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta' }
const TIPO_VIVIENDA_TEXTO: Record<string, string> = { CASA: 'Casa', DEPARTAMENTO: 'Departamento', OTRO: 'Otro' }

export function SolicitudDetallePage() {
  const { usuario } = useAuth()
  const esPublicador = usuario?.tipoUsuario === 'Publicador'
  const { id } = useParams()
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actuando, setActuando] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelado = false
    solicitudService
      .getById(Number(id))
      .then((data) => {
        if (!cancelado) setSolicitud(data)
      })
      .catch((err) => {
        if (!cancelado) setError(err instanceof ApiError ? err.message : 'No se pudo cargar la solicitud')
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })
    return () => {
      cancelado = true
    }
  }, [id])

  async function handleAprobar() {
    if (!solicitud) return
    setActuando(true)
    try {
      setSolicitud(await solicitudService.aprobar(solicitud.id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo aprobar la solicitud')
    } finally {
      setActuando(false)
    }
  }

  async function handleRechazar() {
    if (!solicitud) return
    setActuando(true)
    try {
      setSolicitud(await solicitudService.rechazar(solicitud.id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo rechazar la solicitud')
    } finally {
      setActuando(false)
    }
  }

  if (loading) return <p>Cargando…</p>
  if (error) return <p className="error-message">{error}</p>
  if (!solicitud) return null

  const { mascota, adoptante } = solicitud
  const desglose = calcularDesglose(solicitud)
  const { puntos, total, porcentaje } = totalCompatibilidad(desglose)

  return (
    <section>
      <Link to="/solicitudes" className="back-link">
        ← Volver a solicitudes
      </Link>
      <h1>Detalle de la solicitud</h1>

      <div className="comparison-grid">
        <div className="comparison-card">
          <AvatarZoom
            src={adoptante.fotoPerfil}
            alt={`${adoptante.nombre} ${adoptante.apellido}`}
            fallbackText={adoptante.nombre.charAt(0).toUpperCase()}
          />
          <h2>
            {adoptante.nombre} {adoptante.apellido}
          </h2>
          <p className="comparison-subtitle">Adoptante</p>
          <ul className="comparison-facts">
            <li>
              <strong>Email:</strong> {adoptante.email}
            </li>
            {adoptante.telefono && (
              <li>
                <strong>Teléfono:</strong> {adoptante.telefono}
              </li>
            )}
            {adoptante.direccion && (
              <li>
                <strong>Dirección:</strong> {adoptante.direccion}
              </li>
            )}
            {adoptante.localidad && (
              <li>
                <strong>Localidad:</strong> {adoptante.localidad.nombre} ({adoptante.localidad.provincia.nombre})
              </li>
            )}
            {adoptante.occupation && (
              <li>
                <strong>Ocupación:</strong> {adoptante.occupation}
              </li>
            )}
            {adoptante.tipoVivienda && (
              <li>
                <strong>Vivienda:</strong> {TIPO_VIVIENDA_TEXTO[adoptante.tipoVivienda]}
              </li>
            )}
            {adoptante.descripcion && (
              <li>
                <strong>Descripción:</strong> {adoptante.descripcion}
              </li>
            )}
          </ul>
        </div>

        <div className="comparison-card">
          <AvatarZoom src={mascota.foto} alt={mascota.nombre} fallbackText={mascota.nombre.charAt(0).toUpperCase()} />
          <h2>{mascota.nombre}</h2>
          <p className="comparison-subtitle">
            {mascota.especie.nombre} · Publicado por {mascota.publicador.nombre} {mascota.publicador.apellido}
          </p>
          <ul className="comparison-facts">
            <li>
              <strong>Sexo:</strong> {mascota.sexo === 'MACHO' ? 'Macho' : 'Hembra'}
            </li>
            <li>
              <strong>Edad:</strong> {mascota.edad} {mascota.unidadEdad === 'MESES' ? 'meses' : 'años'}
            </li>
            <li>
              <strong>Tamaño:</strong> {TAMANIO_TEXTO[mascota.caracteristica.tamanio]}
            </li>
            <li>
              <strong>Energía:</strong> {ENERGIA_TEXTO[mascota.caracteristica.energia]}
            </li>
            <li>
              <strong>Carácter:</strong> {mascota.caracteristica.caracter}
            </li>
            <li>
              <strong>Vacunado:</strong> {mascota.caracteristica.vacunacion ? 'Sí' : 'No'}
            </li>
            <li>
              <strong>Castrado:</strong> {mascota.caracteristica.castracion ? 'Sí' : 'No'}
            </li>
            <li>
              <strong>Tolera niños:</strong> {TOLERANCIA_TEXTO[mascota.caracteristica.toleraNinos]}
            </li>
            <li>
              <strong>Tolera otros animales:</strong> {TOLERANCIA_TEXTO[mascota.caracteristica.toleraAnimales]}
            </li>
            <li>
              <strong>Tolera el encierro:</strong> {TOLERANCIA_TEXTO[mascota.caracteristica.toleraEncierro]}
            </li>
            {mascota.caracteristica.observacionesAdicionales && (
              <li>
                <strong>Observaciones:</strong> {mascota.caracteristica.observacionesAdicionales}
              </li>
            )}
          </ul>
        </div>
      </div>

      <h2 className="form-section-title">Compatibilidad</h2>
      <p>
        <strong>
          {puntos} de {total} ({porcentaje}%)
        </strong>{' '}
        — coincidencias entre lo que busca el Adoptante y las características reales de la Mascota, calculado en
        el momento.
      </p>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>Mascota</th>
              <th>Adoptante</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {desglose.map((item) => (
              <tr key={item.factor}>
                <td>{item.factor}</td>
                <td>{item.detalleMascota}</td>
                <td>{item.detalleAdoptante}</td>
                <td>
                  {item.compatible ? (
                    <span className="compat-icon compat-si">✓ Coincide</span>
                  ) : (
                    <span className="compat-icon compat-no">✗ No coincide</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {solicitud.mensaje && (
        <>
          <h2 className="form-section-title">Mensaje del adoptante</h2>
          <p>{solicitud.mensaje}</p>
        </>
      )}

      {esPublicador && solicitud.estado === EstadoSolicitud.PENDIENTE && (
        <div className="detalle-acciones">
          <Button variant="primary" onClick={handleAprobar} disabled={actuando}>
            Aprobar
          </Button>
          <Button variant="secondary" onClick={handleRechazar} disabled={actuando}>
            Rechazar
          </Button>
        </div>
      )}
    </section>
  )
}
