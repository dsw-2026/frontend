import type { CSSProperties } from 'react'
import './Paw.css'

interface PawProps {
  size: number
  toeColor: string
  // Si no se pasa, el "almohadón" central usa el mismo color que los dedos.
  padColor?: string
  opacity?: number
  rotation?: number
  // Posicionamiento (left/top/right/bottom) y animación: varían por
  // instancia, se pasan como estilo inline a propósito.
  style?: CSSProperties
}

// Geometría de referencia a tamaño 44px — el resto de los tamaños se
// escalan proporcionalmente a partir de acá, en vez de tener 4 juegos de
// números mágicos repetidos.
const TAMANIO_BASE = 44
const DEDOS_BASE = [
  { left: 2, top: 12, rotacion: -22 },
  { left: 13, top: 3, rotacion: -8 },
  { left: 24, top: 3, rotacion: 8 },
  { left: 33, top: 12, rotacion: 22 },
]
const DEDO_ANCHO_BASE = 11
const DEDO_ALTO_BASE = 14
const ALMOHADON_BASE = { left: 9, top: 20, width: 26, height: 20 }

export function Paw({ size, toeColor, padColor, opacity = 1, rotation = 0, style }: PawProps) {
  const escala = size / TAMANIO_BASE

  return (
    <div
      className="paw"
      style={{
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    >
      {DEDOS_BASE.map((dedo, i) => (
        <span
          key={i}
          className="paw-toe"
          style={{
            left: dedo.left * escala,
            top: dedo.top * escala,
            width: DEDO_ANCHO_BASE * escala,
            height: DEDO_ALTO_BASE * escala,
            background: toeColor,
            transform: `rotate(${dedo.rotacion}deg)`,
          }}
        />
      ))}
      <span
        className="paw-pad"
        style={{
          left: ALMOHADON_BASE.left * escala,
          top: ALMOHADON_BASE.top * escala,
          width: ALMOHADON_BASE.width * escala,
          height: ALMOHADON_BASE.height * escala,
          background: padColor ?? toeColor,
        }}
      />
    </div>
  )
}
