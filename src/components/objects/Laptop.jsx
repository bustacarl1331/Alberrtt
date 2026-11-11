import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Laptop({
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
  const screenMatRef = useRef();
  const ledRef = useRef();

  // Generate keyboard keys positions
  const keys = useMemo(() => {
    const arr = [];
    const rows = 5;
    const cols = 12;
    const startX = -0.38;
    const startZ = -0.18;
    const keyW = 0.058;
    const keyD = 0.05;
    const gap = 0.005;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({
          x: startX + c * (keyW + gap),
          z: startZ + r * (keyD + gap),
        });
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle idle bob
    groupRef.current.position.y =
      (position?.[1] || 0) + Math.sin(t * 1.2) * 0.008;

    // Screen flicker effect
    if (screenMatRef.current) {
      const flicker = 0.45 + Math.sin(t * 8) * 0.05 + Math.sin(t * 23) * 0.03;
      screenMatRef.current.emissiveIntensity = flicker;
    }

    // Power LED pulse
    if (ledRef.current) {
      ledRef.current.emissiveIntensity = 0.6 + Math.sin(t * 2) * 0.4;
    }
  });

  const screenAngle = (-110 * Math.PI) / 180;

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
      {/* === BASE === */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.7]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* === KEYBOARD KEYS === */}
      {keys.map((k, i) => (
        <mesh key={i} position={[k.x, 0.045, k.z]}>
          <boxGeometry args={[0.054, 0.01, 0.045]} />
          <meshStandardMaterial color="#1e1e22" roughness={0.8} />
        </mesh>
      ))}

      {/* === TRACKPAD === */}
      <mesh position={[0, 0.045, 0.18]}>
        <boxGeometry args={[0.22, 0.005, 0.14]} />
        <meshStandardMaterial color="#222226" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* === SCREEN HINGE AREA === */}
      <group position={[0, 0.04, -0.35]} rotation={[screenAngle, 0, 0]}>
        {/* Screen frame */}
        <mesh position={[0, 0.275, -0.01]}>
          <boxGeometry args={[0.95, 0.55, 0.02]} />
          <meshStandardMaterial color="#1a1a1e" roughness={0.5} metalness={0.4} />
        </mesh>

        {/* Screen face (emissive) */}
        <mesh position={[0, 0.275, 0.001]}>
          <planeGeometry args={[0.85, 0.48]} />
          <meshStandardMaterial
            ref={screenMatRef}
            color="#0a0a0e"
            emissive="#0ea5e9"
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>

        {/* Webcam dot */}
        <mesh position={[0, 0.525, 0.001]}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>

      {/* === POWER LED === */}
      <mesh position={[0.42, 0.045, 0.32]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial
          ref={ledRef}
          color="#00ff66"
          emissive="#00ff66"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
