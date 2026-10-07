import type { CSSProperties } from 'react'
import './Paw.css'

interface PawProps {
  size: number
  toeColor: string
  padColor?: string
  opacity?: number
  rotation?: number
  style?: CSSProperties
}

const BASE_SIZE = 44
const BASE_TOES = [
  { left: 2, top: 12, rotation: -22 },
  { left: 13, top: 3, rotation: -8 },
  { left: 24, top: 3, rotation: 8 },
  { left: 33, top: 12, rotation: 22 },
]
const BASE_TOE_WIDTH = 11
const BASE_TOE_HEIGHT = 14
const BASE_PAD = { left: 9, top: 20, width: 26, height: 20 }

export function Paw({ size, toeColor, padColor, opacity = 1, rotation = 0, style }: PawProps) {
  const scale = size / BASE_SIZE

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
      {BASE_TOES.map((toe, index) => (
        <span
          key={index}
          className="paw-toe"
          style={{
            left: toe.left * scale,
            top: toe.top * scale,
            width: BASE_TOE_WIDTH * scale,
            height: BASE_TOE_HEIGHT * scale,
            background: toeColor,
            transform: `rotate(${toe.rotation}deg)`,
          }}
        />
      ))}
      <span
        className="paw-pad"
        style={{
          left: BASE_PAD.left * scale,
          top: BASE_PAD.top * scale,
          width: BASE_PAD.width * scale,
          height: BASE_PAD.height * scale,
          background: padColor ?? toeColor,
        }}
      />
    </div>
  )
}