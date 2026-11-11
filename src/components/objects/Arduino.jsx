import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Arduino({
  position,
  rotation,
  onPointerOver,
  onPointerOut,
  onClick,
  isHovered,
  isActive,
  ...props
}) {
  const groupRef = useRef();
  const greenLedRef = useRef();
  const redLedRef = useRef();

  // Pin header positions along edges
  const pinHeaders = useMemo(() => {
    const pins = [];
    // Digital pins along top edge
    for (let i = 0; i < 14; i++) {
      pins.push({ x: -0.32 + i * 0.045, z: -0.24 });
    }
    // Analog pins along bottom edge
    for (let i = 0; i < 6; i++) {
      pins.push({ x: -0.1 + i * 0.045, z: 0.24 });
    }
    // Power pins
    for (let i = 0; i < 6; i++) {
      pins.push({ x: 0.12 + i * 0.045, z: 0.24 });
    }
    return pins;
  }, []);

  // Breadboard holes
  const breadboardHoles = useMemo(() => {
    const holes = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 15; c++) {
        holes.push({ x: -0.22 + c * 0.032, z: -0.1 + r * 0.032 });
      }
    }
    return holes;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle idle animation
    groupRef.current.position.y =
      (position?.[1] || 0) + Math.sin(t * 0.9) * 0.006;

    // Green LED blink (power - steady pulse)
    if (greenLedRef.current) {
      greenLedRef.current.emissiveIntensity = 0.7 + Math.sin(t * 2.5) * 0.3;
    }

    // Red/amber LED blink (TX/RX style fast blink)
    if (redLedRef.current) {
      const blink = Math.sin(t * 6) > 0.3 ? 1.0 : 0.1;
      redLedRef.current.emissiveIntensity = blink;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
      {...props}
    >
      {/* === PCB BOARD === */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.55]} />
        <meshStandardMaterial color="#0E7490" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* === USB-B PORT === */}
      <mesh position={[-0.35, 0.065, 0]}>
        <boxGeometry args={[0.1, 0.06, 0.1]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* === DC JACK === */}
      <mesh position={[-0.35, 0.065, 0.17]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.08, 8]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>

      {/* === ATMEGA CHIP === */}
      <mesh position={[0.05, 0.06, 0]}>
        <boxGeometry args={[0.18, 0.03, 0.12]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* === CRYSTAL OSCILLATOR === */}
      <mesh position={[0.18, 0.06, 0.08]}>
        <boxGeometry args={[0.06, 0.02, 0.03]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* === CAPACITORS === */}
      <mesh position={[-0.12, 0.07, 0.12]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
        <meshStandardMaterial color="#222222" roughness={0.6} />
      </mesh>
      <mesh position={[-0.05, 0.07, 0.15]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.04, 8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
      </mesh>
      <mesh position={[0.2, 0.07, -0.1]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.045, 8]} />
        <meshStandardMaterial color="#222222" roughness={0.6} />
      </mesh>

      {/* === GREEN LED (power) === */}
      <mesh position={[0.25, 0.065, 0.15]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial
          ref={greenLedRef}
          color="#00ff44"
          emissive="#00ff44"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* === RED/AMBER LED (TX) === */}
      <mesh position={[0.28, 0.065, 0.15]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial
          ref={redLedRef}
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>

      {/* === RESET BUTTON === */}
      <mesh position={[-0.15, 0.065, -0.15]}>
        <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
        <meshStandardMaterial color="#dddddd" roughness={0.5} />
      </mesh>

      {/* === PIN HEADERS === */}
      {pinHeaders.map((p, i) => (
        <mesh key={`pin-${i}`} position={[p.x, 0.065, p.z]}>
          <cylinderGeometry args={[0.005, 0.005, 0.04, 6]} />
          <meshStandardMaterial color="#B8860B" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      {/* === BREADBOARD === */}
      <group position={[0.85, 0, 0.05]}>
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[0.6, 0.03, 0.35]} />
          <meshStandardMaterial color="#f0f0e8" roughness={0.8} />
        </mesh>

        {/* Center divider line */}
        <mesh position={[0, 0.032, 0]}>
          <boxGeometry args={[0.58, 0.002, 0.008]} />
          <meshStandardMaterial color="#ccccbb" roughness={0.9} />
        </mesh>

        {/* Breadboard holes (subset for performance) */}
        {breadboardHoles.map((h, i) => (
          <mesh key={`hole-${i}`} position={[h.x, 0.032, h.z]}>
            <cylinderGeometry args={[0.004, 0.004, 0.003, 6]} />
            <meshStandardMaterial color="#ccccbb" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* === JUMPER WIRES === */}
      {/* Wire 1: Red - from digital pin to breadboard */}
      <mesh
        position={[0.28, 0.09, -0.12]}
        rotation={[0, 0.3, Math.PI / 6]}
      >
        <cylinderGeometry args={[0.005, 0.005, 0.65, 6]} />
        <meshStandardMaterial color="#e53e3e" roughness={0.6} />
      </mesh>

      {/* Wire 2: Blue - from analog pin to breadboard */}
      <mesh
        position={[0.42, 0.085, 0.18]}
        rotation={[Math.PI / 8, 0.1, Math.PI / 4]}
      >
        <cylinderGeometry args={[0.005, 0.005, 0.5, 6]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
      </mesh>

      {/* Wire 3: Green */}
      <mesh
        position={[0.5, 0.08, -0.05]}
        rotation={[0, -0.2, Math.PI / 5]}
      >
        <cylinderGeometry args={[0.005, 0.005, 0.45, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.6} />
      </mesh>
    </group>
  );
}
