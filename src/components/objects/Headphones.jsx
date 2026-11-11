import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Headphones({
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

  // Create a half-arc curve for the headband
  const headbandCurve = useMemo(() => {
    const points = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = Math.PI * t; // half circle
      const x = Math.cos(angle) * 0.28;
      const y = Math.sin(angle) * 0.15;
      points.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const headbandGeo = useMemo(() => {
    return new THREE.TubeGeometry(headbandCurve, 20, 0.012, 8, false);
  }, [headbandCurve]);

  // Thicker padding for top of headband
  const paddingCurve = useMemo(() => {
    const points = [];
    const segments = 10;
    for (let i = 0; i <= segments; i++) {
      const t = 0.3 + (i / segments) * 0.4; // middle section
      const angle = Math.PI * t;
      const x = Math.cos(angle) * 0.28;
      const y = Math.sin(angle) * 0.15;
      points.push(new THREE.Vector3(x, y, 0));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const paddingGeo = useMemo(() => {
    return new THREE.TubeGeometry(paddingCurve, 10, 0.022, 8, false);
  }, [paddingCurve]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle idle animation
    groupRef.current.position.y =
      (position?.[1] || 0) + Math.sin(t * 0.8) * 0.005;
  });

  // Ear cup positions (at ends of the arc)
  const leftCupPos = [-0.28, 0, 0];
  const rightCupPos = [0.28, 0, 0];

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
      {/* Lying flat on desk: rotate ~90deg on X */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* === HEADBAND (half arc) === */}
        <mesh geometry={headbandGeo}>
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* === HEADBAND PADDING (thicker top section) === */}
        <mesh geometry={paddingGeo}>
          <meshStandardMaterial color="#333333" roughness={0.85} />
        </mesh>

        {/* === LEFT EAR CUP === */}
        <group position={leftCupPos}>
          {/* Outer cup */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.3} />
          </mesh>

          {/* Accent ring */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.031, 0, 0]}>
            <torusGeometry args={[0.14, 0.008, 8, 16]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>

          {/* Cushion (inner side) */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.035, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>

          {/* Cushion ring */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.04, 0, 0]}>
            <torusGeometry args={[0.14, 0.025, 8, 16]} />
            <meshStandardMaterial color="#222222" roughness={0.9} />
          </mesh>
        </group>

        {/* === RIGHT EAR CUP === */}
        <group position={rightCupPos}>
          {/* Outer cup */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.3} />
          </mesh>

          {/* Accent ring */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.031, 0, 0]}>
            <torusGeometry args={[0.14, 0.008, 8, 16]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>

          {/* Cushion (inner side) */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.035, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
          </mesh>

          {/* Cushion ring */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.04, 0, 0]}>
            <torusGeometry args={[0.14, 0.025, 8, 16]} />
            <meshStandardMaterial color="#222222" roughness={0.9} />
          </mesh>
        </group>

        {/* === HINGES / CONNECTORS === */}
        {/* Left hinge */}
        <mesh position={[-0.26, 0.01, 0]}>
          <boxGeometry args={[0.025, 0.06, 0.02]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Right hinge */}
        <mesh position={[0.26, 0.01, 0]}>
          <boxGeometry args={[0.025, 0.06, 0.02]} />
          <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
