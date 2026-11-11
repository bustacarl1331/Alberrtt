import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Notebook({
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

  // Page layers with slightly varied colors
  const pages = useMemo(() => {
    const arr = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      // Pages fan open slightly from left to right
      const yRot = -0.02 + t * 0.12;
      const shade = 240 + Math.floor(Math.random() * 15);
      const color = `rgb(${shade}, ${shade}, ${shade - 10})`;
      arr.push({ yRot, yOffset: 0.003 * i, color });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle idle float
    groupRef.current.position.y =
      (position?.[1] || 0) + Math.sin(t * 1.0) * 0.005;
    groupRef.current.rotation.z =
      (rotation?.[2] || 0) + Math.sin(t * 0.7) * 0.003;
  });

  const coverAngle = (150 * Math.PI) / 180;

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
      {/* === BACK COVER (lying flat) === */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.7, 0.02, 0.5]} />
        <meshStandardMaterial color="#5C4033" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* === SPINE === */}
      <mesh position={[-0.35, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color="#4a3628" roughness={0.8} />
      </mesh>

      {/* === PAGES (stacked, fanning open slightly) === */}
      {pages.map((page, i) => (
        <group key={i} position={[-0.34, 0.025 + page.yOffset, 0]}>
          <mesh
            position={[0.3, 0, 0]}
            rotation={[0, page.yRot, 0]}
          >
            <boxGeometry args={[0.6, 0.004, 0.46]} />
            <meshStandardMaterial color={page.color} roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* === Page edge lines (texture effect) === */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={`edge-${i}`}
          position={[0.34, 0.025 + i * 0.003, 0]}
        >
          <boxGeometry args={[0.003, 0.003, 0.44]} />
          <meshStandardMaterial color="#d8d4c8" roughness={0.9} />
        </mesh>
      ))}

      {/* === FRONT COVER (rotated open) === */}
      <group position={[-0.35, 0.02, 0]}>
        <mesh
          position={[-0.35, 0.01, 0]}
          rotation={[0, coverAngle, 0]}
        >
          <boxGeometry args={[0.7, 0.02, 0.5]} />
          <meshStandardMaterial color="#5C4033" roughness={0.85} metalness={0.05} />
        </mesh>
      </group>

      {/* === PENCIL === */}
      <group position={[0.55, 0.02, 0.1]} rotation={[0, 0.15, Math.PI / 2]}>
        {/* Pencil body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 6]} />
          <meshStandardMaterial color="#F5C542" roughness={0.6} />
        </mesh>

        {/* Pencil tip (wood taper) */}
        <mesh position={[0, -0.2, 0]}>
          <coneGeometry args={[0.012, 0.05, 6]} />
          <meshStandardMaterial color="#c9a44a" roughness={0.7} />
        </mesh>

        {/* Graphite tip */}
        <mesh position={[0, -0.23, 0]}>
          <coneGeometry args={[0.004, 0.02, 6]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Eraser */}
        <mesh position={[0, 0.19, 0]}>
          <cylinderGeometry args={[0.013, 0.013, 0.03, 6]} />
          <meshStandardMaterial color="#e8a0a0" roughness={0.8} />
        </mesh>

        {/* Metal ferrule */}
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.02, 6]} />
          <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
