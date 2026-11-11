import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import usePortfolioStore from '../../store/usePortfolioStore'

export default function InteractiveObject({
  id,
  name,
  subtitle,
  position = [0, 0, 0],
  children,
  seed = 0,
}) {
  const groupRef = useRef()
  const { hoveredObject, activeSection, setHoveredObject, setActiveSection, isEntered } = usePortfolioStore()
  const isHovered = hoveredObject === id

  // Animation state
  const animState = useRef({
    currentY: 0,
    targetY: 0,
    currentScale: 1,
    targetScale: 1,
  })

  const reducedMotion = usePortfolioStore((s) => s.reducedMotion)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const t = state.clock.elapsedTime + seed * 10

    // Idle floating
    const idleY = reducedMotion ? 0 : Math.sin(t * 0.8) * 0.025
    // Hover targets
    animState.current.targetY = isHovered ? 0.25 : 0
    animState.current.targetScale = isHovered ? 1.08 : 1

    // Smooth interpolation
    const lerpSpeed = 5 * delta
    animState.current.currentY += (animState.current.targetY - animState.current.currentY) * lerpSpeed
    animState.current.currentScale += (animState.current.targetScale - animState.current.currentScale) * lerpSpeed

    // Apply transforms
    groupRef.current.position.x = position[0]
    groupRef.current.position.y = position[1] + idleY + animState.current.currentY
    groupRef.current.position.z = position[2]

    // Keep authored model rotations stable. Floating the whole object is enough;
    // rotating the parent made hinged props appear twisted.
    groupRef.current.rotation.set(0, 0, 0)

    const s = animState.current.currentScale
    groupRef.current.scale.set(s, s, s)
  })

  const handlePointerOver = (e) => {
    if (!isEntered) return
    e.stopPropagation()
    setHoveredObject(id)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHoveredObject(null)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e) => {
    if (!isEntered) return
    e.stopPropagation()
    setActiveSection(id)
    setHoveredObject(null)
    document.body.style.cursor = 'default'
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {children}

      {/* Hover glow ring */}
      {isHovered && (
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.55, 32]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.15} />
        </mesh>
      )}

      {/* Floating label */}
      {isHovered && !activeSection && (
        <Html
          position={[0, 0.7, 0]}
          center
          distanceFactor={6}
          style={{ pointerEvents: 'none' }}
        >
          <div className="text-center whitespace-nowrap">
            <div className="bg-[#0f0f1a]/90 backdrop-blur-sm border border-[#fbbf24]/30 rounded-lg px-4 py-2 shadow-lg">
              <p className="text-[#fbbf24] font-semibold text-sm tracking-wide">{name}</p>
              {subtitle && (
                <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
