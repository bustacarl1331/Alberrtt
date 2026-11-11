import React, { useRef } from 'react'
import * as THREE from 'three'

export default function Desk() {
  return (
    <group position={[0, 0, 0]}>
      {/* Desk top surface */}
      <mesh position={[0, 0.75, 0]} receiveShadow castShadow>
        <boxGeometry args={[5.5, 0.08, 3.2]} />
        <meshStandardMaterial
          color="#5c3a1e"
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Desk edge trim - front */}
      <mesh position={[0, 0.72, 1.6]} castShadow>
        <boxGeometry args={[5.5, 0.04, 0.06]} />
        <meshStandardMaterial color="#4a2e14" roughness={0.6} />
      </mesh>

      {/* Desk edge trim - back */}
      <mesh position={[0, 0.72, -1.6]} castShadow>
        <boxGeometry args={[5.5, 0.04, 0.06]} />
        <meshStandardMaterial color="#4a2e14" roughness={0.6} />
      </mesh>

      {/* Desk edge trim - left */}
      <mesh position={[-2.75, 0.72, 0]} castShadow>
        <boxGeometry args={[0.06, 0.04, 3.2]} />
        <meshStandardMaterial color="#4a2e14" roughness={0.6} />
      </mesh>

      {/* Desk edge trim - right */}
      <mesh position={[2.75, 0.72, 0]} castShadow>
        <boxGeometry args={[0.06, 0.04, 3.2]} />
        <meshStandardMaterial color="#4a2e14" roughness={0.6} />
      </mesh>

      {/* Front-left leg */}
      <mesh position={[-2.4, 0.35, 1.3]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#3d2210" roughness={0.8} />
      </mesh>

      {/* Front-right leg */}
      <mesh position={[2.4, 0.35, 1.3]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#3d2210" roughness={0.8} />
      </mesh>

      {/* Back-left leg */}
      <mesh position={[-2.4, 0.35, -1.3]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#3d2210" roughness={0.8} />
      </mesh>

      {/* Back-right leg */}
      <mesh position={[2.4, 0.35, -1.3]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color="#3d2210" roughness={0.8} />
      </mesh>

      {/* Drawer panel - front center */}
      <mesh position={[0, 0.55, 1.28]} castShadow>
        <boxGeometry args={[1.4, 0.3, 0.04]} />
        <meshStandardMaterial color="#4a2e14" roughness={0.7} />
      </mesh>

      {/* Drawer knob */}
      <mesh position={[0, 0.55, 1.31]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#8B7355" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Subtle desk mat / work area */}
      <mesh position={[0, 0.795, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 2]} />
        <meshStandardMaterial
          color="#2a2520"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0d0d12" roughness={1} />
      </mesh>

      {/* Back wall hint */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#0f0f18" roughness={1} />
      </mesh>
    </group>
  )
}
