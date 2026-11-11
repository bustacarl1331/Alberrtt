import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Camera3D({
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
  const recDotRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle idle bob
    groupRef.current.position.y =
      (position?.[1] || 0) + Math.sin(t * 1.1) * 0.006;
    groupRef.current.rotation.y =
      (rotation?.[1] || 0) + Math.sin(t * 0.6) * 0.01;

    // Recording dot blink
    if (recDotRef.current) {
      recDotRef.current.emissiveIntensity = Math.sin(t * 3) > 0 ? 1.2 : 0.1;
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
      {/* === CAMERA BODY === */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* === GRIP (right side, slightly wider) === */}
      <mesh position={[0.27, -0.02, 0]}>
        <boxGeometry args={[0.08, 0.38, 0.32]} />
        <meshStandardMaterial color="#222222" roughness={0.85} />
      </mesh>

      {/* === LENS BARREL === */}
      <mesh position={[0, 0, -0.27]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.25, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* === LENS FRONT RING === */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.015, 8, 16]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* === LENS GLASS (front) === */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial
          color="#0a0a2a"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* === LENS ZOOM RING === */}
      <mesh position={[0, 0, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.012, 8, 16]} />
        <meshStandardMaterial color="#444444" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* === VIEWFINDER BUMP === */}
      <mesh position={[0, 0.22, 0.02]}>
        <boxGeometry args={[0.12, 0.08, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* === VIEWFINDER EYEPIECE === */}
      <mesh position={[0, 0.22, 0.08]}>
        <boxGeometry args={[0.08, 0.06, 0.03]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* === FLASH HOTSHOE === */}
      <mesh position={[0, 0.19, -0.04]}>
        <boxGeometry args={[0.1, 0.015, 0.06]} />
        <meshStandardMaterial color="#999999" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* === SHUTTER BUTTON === */}
      <mesh position={[0.15, 0.2, -0.08]}>
        <cylinderGeometry args={[0.02, 0.02, 0.015, 8]} />
        <meshStandardMaterial color="#cccccc" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* === RECORDING DOT (red) === */}
      <mesh position={[-0.18, 0.12, -0.151]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial
          ref={recDotRef}
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </mesh>

      {/* === MODE DIAL (top) === */}
      <mesh position={[-0.15, 0.2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
}
