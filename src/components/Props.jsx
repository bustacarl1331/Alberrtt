import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RaspberryPi({ position = [0, 0, 0] }) {
  const ledRef = useRef()

  useFrame((state) => {
    if (ledRef.current) {
      ledRef.current.material.emissiveIntensity =
        Math.sin(state.clock.elapsedTime * 3) > 0 ? 1.5 : 0.2
    }
  })

  return (
    <group position={position} rotation={[0, 0.3, 0]}>
      {/* PCB */}
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.03, 0.35]} />
        <meshStandardMaterial color="#1a5e1a" roughness={0.6} />
      </mesh>
      {/* SoC chip */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.08, 0.02, 0.08]} />
        <meshStandardMaterial color="#222" metalness={0.5} />
      </mesh>
      {/* USB ports */}
      <mesh position={[0.2, 0.025, 0.12]}>
        <boxGeometry args={[0.06, 0.04, 0.05]} />
        <meshStandardMaterial color="#888" metalness={0.7} />
      </mesh>
      <mesh position={[0.2, 0.025, -0.05]}>
        <boxGeometry args={[0.06, 0.04, 0.05]} />
        <meshStandardMaterial color="#888" metalness={0.7} />
      </mesh>
      {/* Ethernet */}
      <mesh position={[-0.18, 0.03, 0]}>
        <boxGeometry args={[0.07, 0.06, 0.08]} />
        <meshStandardMaterial color="#777" metalness={0.6} />
      </mesh>
      {/* Status LED */}
      <mesh ref={ledRef} position={[0.15, 0.025, -0.13]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={1} />
      </mesh>
      {/* GPIO pins */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-0.05 + i * 0.025, 0.03, -0.16]}>
          <cylinderGeometry args={[0.004, 0.004, 0.03, 4]} />
          <meshStandardMaterial color="#b8860b" metalness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function ESP32({ position = [0, 0, 0] }) {
  const ledRef = useRef()

  useFrame((state) => {
    if (ledRef.current) {
      ledRef.current.material.emissiveIntensity =
        Math.sin(state.clock.elapsedTime * 2.5 + 1) > 0.3 ? 1.2 : 0.1
    }
  })

  return (
    <group position={position} rotation={[0, -0.5, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.02, 0.14]} />
        <meshStandardMaterial color="#1a1a4a" roughness={0.5} />
      </mesh>
      {/* Chip */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.015, 0.06]} />
        <meshStandardMaterial color="#333" metalness={0.4} />
      </mesh>
      {/* USB micro */}
      <mesh position={[0.13, 0.015, 0]}>
        <boxGeometry args={[0.03, 0.02, 0.04]} />
        <meshStandardMaterial color="#888" metalness={0.6} />
      </mesh>
      {/* Blue LED */}
      <mesh ref={ledRef} position={[-0.08, 0.018, 0.04]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={1} />
      </mesh>
      {/* Pins */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`l${i}`} position={[-0.1 + i * 0.03, 0.018, 0.065]}>
          <cylinderGeometry args={[0.003, 0.003, 0.02, 4]} />
          <meshStandardMaterial color="#b8860b" metalness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function Oscilloscope({ position = [0, 0, 0] }) {
  const waveRef = useRef()

  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.material.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.3
    }
  })

  return (
    <group position={position} rotation={[0, 0.2, 0]}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.35, 0.25, 0.2]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.6} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.02, 0.101]} ref={waveRef}>
        <planeGeometry args={[0.25, 0.15]} />
        <meshStandardMaterial
          color="#001a00"
          emissive="#00ff44"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Knobs */}
      {[0.1, 0.05, 0, -0.05].map((x, i) => (
        <mesh key={i} position={[x, -0.1, 0.101]}>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#555" metalness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function SolderingIron({ position = [0, 0, 0] }) {
  return (
    <group position={position} rotation={[0, 0.8, 0]}>
      {/* Handle */}
      <mesh castShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.2, 8]} />
        <meshStandardMaterial color="#444" roughness={0.5} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.08, 8]} />
        <meshStandardMaterial color="#d4a017" roughness={0.6} />
      </mesh>
      {/* Tip */}
      <mesh position={[0, 0.14, 0]}>
        <coneGeometry args={[0.008, 0.1, 8]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff4400"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Tip glow */}
      <pointLight position={[0, 0.18, 0]} color="#ff4400" intensity={0.15} distance={0.5} />
    </group>
  )
}

function DeskFan({ position = [0, 0, 0] }) {
  const bladesRef = useRef()

  useFrame((state, delta) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z += delta * 1.5
    }
  })

  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.03, 12]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.17, 8]} />
        <meshStandardMaterial color="#444" metalness={0.5} />
      </mesh>
      {/* Motor housing */}
      <mesh position={[0, 0.2, 0.03]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#333" roughness={0.4} />
      </mesh>
      {/* Blades */}
      <group ref={bladesRef} position={[0, 0.2, 0.07]}>
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh key={i} rotation={[0, 0, angle]} position={[Math.cos(angle) * 0.05, Math.sin(angle) * 0.05, 0]}>
            <boxGeometry args={[0.06, 0.015, 0.003]} />
            <meshStandardMaterial color="#ddd" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      {/* Guard ring */}
      <mesh position={[0, 0.2, 0.07]}>
        <torusGeometry args={[0.08, 0.004, 8, 24]} />
        <meshStandardMaterial color="#555" metalness={0.5} />
      </mesh>
    </group>
  )
}

function DigitalClock({ position = [0, 0, 0] }) {
  return (
    <group position={position} rotation={[0, -0.3, 0]}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.1, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.01, 0.031]}>
        <planeGeometry args={[0.16, 0.06]} />
        <meshStandardMaterial
          color="#001100"
          emissive="#00ff88"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  )
}

function StickyNotes({ position = [0, 0, 0] }) {
  const colors = ['#fbbf24', '#f87171', '#34d399', '#60a5fa']
  return (
    <group position={position}>
      {colors.map((color, i) => (
        <mesh
          key={i}
          position={[
            (i % 2) * 0.12 - 0.06,
            0.005 + i * 0.003,
            Math.floor(i / 2) * 0.12 - 0.06,
          ]}
          rotation={[-Math.PI / 2, 0, (i * 0.15) - 0.2]}
          castShadow
        >
          <planeGeometry args={[0.12, 0.12]} />
          <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function USBDrives({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* USB drive 1 */}
      <group position={[0, 0, 0]} rotation={[0, 0.7, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.015, 0.025]} />
          <meshStandardMaterial color="#2563eb" roughness={0.4} />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <boxGeometry args={[0.025, 0.008, 0.018]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
        </mesh>
      </group>
      {/* USB drive 2 */}
      <group position={[0.08, 0, 0.05]} rotation={[0, -0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.015, 0.025]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <boxGeometry args={[0.025, 0.008, 0.018]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
        </mesh>
      </group>
      {/* SD card */}
      <mesh position={[0.05, 0, -0.04]} rotation={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.03, 0.005, 0.025]} />
        <meshStandardMaterial color="#222" roughness={0.3} />
      </mesh>
    </group>
  )
}

function Books({ position = [0, 0, 0] }) {
  return (
    <group position={position} rotation={[0, 0.15, 0]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.28]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.8} />
      </mesh>
      <mesh position={[0.01, 0.06, 0]} castShadow>
        <boxGeometry args={[0.18, 0.035, 0.26]} />
        <meshStandardMaterial color="#5f1e3a" roughness={0.8} />
      </mesh>
      <mesh position={[-0.01, 0.095, 0.02]} castShadow>
        <boxGeometry args={[0.22, 0.03, 0.24]} />
        <meshStandardMaterial color="#3a5f1e" roughness={0.8} />
      </mesh>
    </group>
  )
}

function WasteBin({ position = [0, 0, 0] }) {
  return (
    <group position={position} rotation={[0, -0.18, 0]}>
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.17, 0.62, 20]} />
        <meshStandardMaterial color="#27303b" roughness={0.55} metalness={0.28} />
      </mesh>
      <mesh position={[0, 0.64, 0]} castShadow>
        <torusGeometry args={[0.205, 0.025, 10, 24]} />
        <meshStandardMaterial color="#7b8795" roughness={0.35} metalness={0.65} />
      </mesh>
      <mesh position={[0, 0.655, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.17, 20]} />
        <meshStandardMaterial color="#10151c" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Chair({ position = [0, 0, 0] }) {
  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.9, 0.9, 0.12]} />
        <meshStandardMaterial color="#263445" roughness={0.68} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0.82, 0.08]} castShadow>
        <boxGeometry args={[0.92, 0.12, 0.82]} />
        <meshStandardMaterial color="#34475c" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.075, 0.7, 12]} />
        <meshStandardMaterial color="#748193" roughness={0.3} metalness={0.75} />
      </mesh>
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.05, 16]} />
        <meshStandardMaterial color="#1e2732" roughness={0.5} metalness={0.5} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.28, 0.07, Math.sin(angle) * 0.28]}
            rotation={[0, 0, Math.cos(angle) * 0.75]}
            castShadow
          >
            <boxGeometry args={[0.38, 0.035, 0.045]} />
            <meshStandardMaterial color="#293441" roughness={0.5} metalness={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

function SmallRover({ position = [0, 0, 0] }) {
  const roverRef = useRef()
  const startPos = useRef(position)

  useFrame((state) => {
    if (roverRef.current) {
      const t = state.clock.elapsedTime
      // Occasional small movement
      const movePhase = Math.sin(t * 0.15) * 0.5 + 0.5 // 0 to 1, slow cycle
      if (movePhase > 0.9) {
        roverRef.current.position.x = position[0] + Math.sin(t * 0.8) * 0.05
        roverRef.current.position.z = position[2] + Math.cos(t * 0.6) * 0.03
      }
    }
  })

  return (
    <group ref={roverRef} position={position}>
      {/* Chassis */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.12, 0.03, 0.08]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
      {/* Top */}
      <mesh position={[0, 0.055, -0.01]}>
        <boxGeometry args={[0.08, 0.02, 0.05]} />
        <meshStandardMaterial color="#1a1a4a" roughness={0.5} />
      </mesh>
      {/* Wheels */}
      {[
        [-0.055, 0.015, 0.04],
        [0.055, 0.015, 0.04],
        [-0.055, 0.015, -0.04],
        [0.055, 0.015, -0.04],
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.015, 8]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
      ))}
      {/* Antenna */}
      <mesh position={[0.03, 0.08, -0.02]}>
        <cylinderGeometry args={[0.002, 0.002, 0.04, 4]} />
        <meshStandardMaterial color="#888" metalness={0.6} />
      </mesh>
      <mesh position={[0.03, 0.1, -0.02]}>
        <sphereGeometry args={[0.005, 6, 6]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Particles() {
  const meshRef = useRef()
  const count = 30

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = 0.8 + Math.random() * 3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      speeds[i] = 0.1 + Math.random() * 0.2
    }
    return { positions, speeds }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const posArray = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i] * 0.002
      posArray[i * 3] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.0005

      // Reset particles that float too high
      if (posArray[i * 3 + 1] > 4) {
        posArray[i * 3 + 1] = 0.8
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#fbbf24"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

export default function Props() {
  return (
    <group>
      <RaspberryPi position={[0.85, 0.84, -1.1]} />
      <ESP32 position={[-0.85, 0.84, -1.0]} />
      <Oscilloscope position={[1.9, 0.93, -1.2]} />
      <SolderingIron position={[-2.0, 0.9, -0.3]} />
      <DeskFan position={[-2.25, 0.84, -1.0]} />
      <DigitalClock position={[0.8, 0.91, -1.3]} />
      <StickyNotes position={[1.0, 0.84, 0.5]} />
      <USBDrives position={[-0.3, 0.84, 0.4]} />
      <Books position={[2.0, 0.84, 1.0]} />
      <SmallRover position={[-1.0, 0.84, 1.0]} />
      <WasteBin position={[3.15, 0.02, 0.9]} />
      <Chair position={[-0.1, 0.02, 3.05]} />
      <Particles />
    </group>
  )
}
