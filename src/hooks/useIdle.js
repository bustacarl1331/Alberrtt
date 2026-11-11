import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function useIdle(speed = 1, amplitude = 0.03, seed = 0) {
  const values = useRef({ y: 0, rotY: 0, rotX: 0 })

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + seed
    values.current.y = Math.sin(t * 0.8) * amplitude
    values.current.rotY = Math.sin(t * 0.5) * 0.02
    values.current.rotX = Math.sin(t * 0.3 + 1) * 0.01
  })

  return values
}
