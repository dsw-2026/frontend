import { useState, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { FotoUpload } from '../../components/ui/FotoUpload'
import {
  Sexo,
  UnidadEdad,
  EstadoMascota,
  Tamanio,
  Energia,
  Tolerancia,
  type MascotaInput,
} from '../../models/mascota'
import type { Especie } from '../../models/especie'
import type { Publicador } from '../../models/publicador'

interface MascotaFormValues {
  nombre: string
  sexo: Sexo
  edad: number
  unidadEdad: UnidadEdad
  estado: EstadoMascota
  foto: string
  especieId: number | ''
  publicadorId: number | ''
  energia: Energia
  caracter: string
  tamanio: Tamanio
  vacunacion: boolean
  castracion: boolean
  toleraNinos: Tolerancia
  toleraAnimales: Tolerancia
  toleraEncierro: Tolerancia
  observacionesAdicionales: string
}

interface MascotaFormProps {
  initialValues?: MascotaFormValues
  especies: Especie[]
  publicadores: Publicador[]
  onSubmit: (values: MascotaInput) => void
  submitting: boolean
}

// Un registro por valor de enum, mostrado en español en los <select>. El
// backend sigue guardando el valor en mayúsculas (ej: "PEQUENIO"); esto
// es solo la etiqueta visual.
const SEXO_LABELS: Record<Sexo, string> = { MACHO: 'Macho', HEMBRA: 'Hembra' }
const UNIDAD_EDAD_LABELS: Record<UnidadEdad, string> = { MESES: 'Meses', ANIOS: 'Años' }
const ESTADO_LABELS: Record<EstadoMascota, string> = {
  DISPONIBLE: 'Disponible',
  EN_PROCESO: 'En proceso',
  ADOPTADA: 'Adoptada',
  NO_DISPONIBLE: 'No disponible',
}
const TAMANIO_LABELS: Record<Tamanio, string> = {
  PEQUENIO: 'Pequeño',
  MEDIANO: 'Mediano',
  GRANDE: 'Grande',
  GIGANTE: 'Gigante',
}
const ENERGIA_LABELS: Record<Energia, string> = { BAJA: 'Baja', MEDIA: 'Media', ALTA: 'Alta' }
const TOLERANCIA_LABELS: Record<Tolerancia, string> = { SI: 'Sí', NO: 'No', DESCONOCIDO: 'Desconocido' }

export function MascotaForm({ initialValues, especies, publicadores, onSubmit, submitting }: MascotaFormProps) {
  const [nombre, setNombre] = useState(initialValues?.nombre ?? '')
  const [sexo, setSexo] = useState<Sexo>(initialValues?.sexo ?? Sexo.MACHO)
  const [edad, setEdad] = useState(initialValues ? String(initialValues.edad) : '')
  const [unidadEdad, setUnidadEdad] = useState<UnidadEdad>(initialValues?.unidadEdad ?? UnidadEdad.ANIOS)
  // Al crear, arranca en DISPONIBLE por defecto — es el estado con el que
  // nace toda mascota nueva en el flujo normal (Epic A la busca así).
  const [estado, setEstado] = useState<EstadoMascota>(initialValues?.estado ?? EstadoMascota.DISPONIBLE)
  const [foto, setFoto] = useState(initialValues?.foto ?? '')
  const [especieId, setEspecieId] = useState(initialValues ? String(initialValues.especieId) : '')
  const [publicadorId, setPublicadorId] = useState(initialValues ? String(initialValues.publicadorId) : '')

  const [energia, setEnergia] = useState<Energia>(initialValues?.energia ?? Energia.MEDIA)
  const [caracter, setCaracter] = useState(initialValues?.caracter ?? '')
  const [tamanio, setTamanio] = useState<Tamanio>(initialValues?.tamanio ?? Tamanio.MEDIANO)
  const [vacunacion, setVacunacion] = useState(initialValues?.vacunacion ?? false)
  const [castracion, setCastracion] = useState(initialValues?.castracion ?? false)
  const [toleraNinos, setToleraNinos] = useState<Tolerancia>(initialValues?.toleraNinos ?? Tolerancia.DESCONOCIDO)
  const [toleraAnimales, setToleraAnimales] = useState<Tolerancia>(
    initialValues?.toleraAnimales ?? Tolerancia.DESCONOCIDO
  )
  const [toleraEncierro, setToleraEncierro] = useState<Tolerancia>(
    initialValues?.toleraEncierro ?? Tolerancia.DESCONOCIDO
  )
  const [observacionesAdicionales, setObservacionesAdicionales] = useState(
    initialValues?.observacionesAdicionales ?? ''
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      nombre: nombre.trim(),
      sexo,
      edad: Number(edad),
      unidadEdad,
      estado,
      foto: foto.trim() || undefined,
      especie: Number(especieId),
      publicador: Number(publicadorId),
      energia,
      caracter: caracter.trim(),
      tamanio,
      vacunacion,
      castracion,
      toleraNinos,
      toleraAnimales,
      toleraEncierro,
      observacionesAdicionales: observacionesAdicionales.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form form-wide">
      <h2 className="form-section-title">Datos de la mascota</h2>
      <label className="form-field">
        <span>Nombre</span>
        <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} required autoFocus />
      </label>
      <label className="form-field">
        <span>Especie</span>
        <select value={especieId} onChange={(event) => setEspecieId(event.target.value)} required>
          <option value="" disabled>
            Seleccioná una especie
          </option>
          {especies.map((especie) => (
            <option key={especie.id} value={especie.id}>
              {especie.nombre}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Publicador</span>
        <select value={publicadorId} onChange={(event) => setPublicadorId(event.target.value)} required>
          <option value="" disabled>
            Seleccioná un publicador
          </option>
          {publicadores.map((publicador) => (
            <option key={publicador.id} value={publicador.id}>
              {publicador.nombre} {publicador.apellido}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Sexo</span>
        <select value={sexo} onChange={(event) => setSexo(event.target.value as Sexo)}>
          {Object.values(Sexo).map((valor) => (
            <option key={valor} value={valor}>
              {SEXO_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Edad</span>
        <input
          type="number"
          value={edad}
          onChange={(event) => setEdad(event.target.value)}
          required
          min={0}
        />
      </label>
      <label className="form-field">
        <span>Unidad de edad</span>
        <select value={unidadEdad} onChange={(event) => setUnidadEdad(event.target.value as UnidadEdad)}>
          {Object.values(UnidadEdad).map((valor) => (
            <option key={valor} value={valor}>
              {UNIDAD_EDAD_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Estado</span>
        <select value={estado} onChange={(event) => setEstado(event.target.value as EstadoMascota)}>
          {Object.values(EstadoMascota).map((valor) => (
            <option key={valor} value={valor}>
              {ESTADO_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Foto</span>
        <FotoUpload value={foto} onChange={setFoto} label="foto" />
      </label>

      <h2 className="form-section-title">Características</h2>
      <label className="form-field">
        <span>Energía</span>
        <select value={energia} onChange={(event) => setEnergia(event.target.value as Energia)}>
          {Object.values(Energia).map((valor) => (
            <option key={valor} value={valor}>
              {ENERGIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Carácter</span>
        <input
          type="text"
          value={caracter}
          onChange={(event) => setCaracter(event.target.value)}
          required
          placeholder="Ej: Juguetón y cariñoso, un poco tímido al principio"
        />
      </label>
      <label className="form-field">
        <span>Tamaño</span>
        <select value={tamanio} onChange={(event) => setTamanio(event.target.value as Tamanio)}>
          {Object.values(Tamanio).map((valor) => (
            <option key={valor} value={valor}>
              {TAMANIO_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field form-field-checkbox">
        <input type="checkbox" checked={vacunacion} onChange={(event) => setVacunacion(event.target.checked)} />
        <span>Vacunado</span>
      </label>
      <label className="form-field form-field-checkbox">
        <input type="checkbox" checked={castracion} onChange={(event) => setCastracion(event.target.checked)} />
        <span>Castrado</span>
      </label>
      <label className="form-field">
        <span>Tolera niños</span>
        <select value={toleraNinos} onChange={(event) => setToleraNinos(event.target.value as Tolerancia)}>
          {Object.values(Tolerancia).map((valor) => (
            <option key={valor} value={valor}>
              {TOLERANCIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Tolera otros animales</span>
        <select value={toleraAnimales} onChange={(event) => setToleraAnimales(event.target.value as Tolerancia)}>
          {Object.values(Tolerancia).map((valor) => (
            <option key={valor} value={valor}>
              {TOLERANCIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Tolera el encierro</span>
        <select value={toleraEncierro} onChange={(event) => setToleraEncierro(event.target.value as Tolerancia)}>
          {Object.values(Tolerancia).map((valor) => (
            <option key={valor} value={valor}>
              {TOLERANCIA_LABELS[valor]}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Observaciones adicionales</span>
        <textarea
          value={observacionesAdicionales}
          onChange={(event) => setObservacionesAdicionales(event.target.value)}
          rows={3}
        />
      </label>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Guardando…' : 'Guardar'}
      </Button>
    </form>
  )
}
