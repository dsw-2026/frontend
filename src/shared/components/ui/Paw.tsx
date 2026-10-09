import type { CSSProperties } from 'react'

interface PawProps {
  size: number
  toeColor: string
  padColor?: string
  opacity?: number
  rotation?: number
  style?: CSSProperties
}

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
      className="relative pointer-events-none select-none inline-block"
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
          className="absolute rounded-full block"
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
        className="absolute rounded-[40%_40%_45%_45%] block"
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