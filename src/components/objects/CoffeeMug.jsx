import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SteamParticle({ phase, radius = 0.04 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Each particle loops at a different phase
    const cycle = ((t * 0.4 + phase) % 1.0);

    // Rise upward
    meshRef.current.position.y = 0.12 + cycle * 0.35;

    // Gentle side drift
    meshRef.current.position.x = Math.sin(t * 1.5 + phase * 6) * 0.025;
    meshRef.current.position.z = Math.cos(t * 1.2 + phase * 4) * 0.02;

    // Scale: grow then shrink
    const scale = Math.sin(cycle * Math.PI) * 0.7 + 0.3;
    meshRef.current.scale.setScalar(scale);

    // Opacity: fade out as it rises
    meshRef.current.material.opacity = (1.0 - cycle) * 0.35;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.015, 6, 6]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function CoffeeMug({
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

  // Handle shape (torus segment)
  const handleGeo = useMemo(() => {
    return new THREE.TorusGeometry(0.06, 0.012, 8, 12, Math.PI);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle idle bob
    groupRef.current.position.y =
      (position?.[1] || 0) + Math.sin(t * 0.9) * 0.004;
  });

  const steamPhases = [0, 0.2, 0.4, 0.65, 0.85];

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
      {/* === MUG BODY (open top cylinder) === */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.22, 16, 1, true]} />
        <meshStandardMaterial
          color="#e8dcc8"
          roughness={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* === MUG BOTTOM === */}
      <mesh position={[0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color="#e0d4be" roughness={0.8} />
      </mesh>

      {/* === RIM (slightly wider ring at top) === */}
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[0.12, 0.008, 8, 16]} />
        <meshStandardMaterial color="#ddd0ba" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* === COFFEE SURFACE === */}
      <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.11, 16]} />
        <meshStandardMaterial
          color="#3a1f0a"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* === HANDLE === */}
      <mesh
        geometry={handleGeo}
        position={[0.15, 0.11, 0]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <meshStandardMaterial color="#e8dcc8" roughness={0.75} />
      </mesh>

      {/* === STEAM PARTICLES === */}
      <group position={[0, 0, 0]}>
        {steamPhases.map((phase, i) => (
          <SteamParticle key={i} phase={phase} />
        ))}
      </group>
    </group>
  );
}
