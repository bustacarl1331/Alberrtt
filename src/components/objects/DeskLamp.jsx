import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function DeskLamp({
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
  const bulbRef = useRef();

  const lowerArmLen = 0.42;
  const upperArmLen = 0.34;
  const lowerArmAngle = -Math.PI * 0.28;
  const upperArmAngle = Math.PI * 0.42;
  const jointX = Math.sin(lowerArmAngle) * lowerArmLen;
  const jointY = Math.cos(lowerArmAngle) * lowerArmLen;
  const headX = jointX + Math.sin(lowerArmAngle + upperArmAngle) * upperArmLen;
  const headY = jointY + Math.cos(lowerArmAngle + upperArmAngle) * upperArmLen;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle idle sway
    groupRef.current.position.y =
      (position?.[1] || 0) + Math.sin(t * 0.7) * 0.003;

    // Bulb glow pulse
    if (bulbRef.current) {
      bulbRef.current.emissiveIntensity = 1.3 + Math.sin(t * 1.5) * 0.2;
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
      scale={1.42}
      {...props}
    >
      {/* === BASE === */}
      <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.16, 0.03, 16]} />
        <meshStandardMaterial color="#303846" roughness={0.32} metalness={0.72} />
      </mesh>

      {/* === BASE ACCENT RING === */}
      <mesh position={[0, 0.032, 0]}>
        <torusGeometry args={[0.12, 0.005, 8, 16]} />
        <meshStandardMaterial color="#444444" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* === LOWER ARM === */}
      <group position={[0, 0.03, 0]}>
        <mesh
          position={[jointX / 2, jointY / 2, 0]}
          rotation={[0, 0, -lowerArmAngle]}
          castShadow
        >
          <boxGeometry args={[0.035, lowerArmLen, 0.035]} />
          <meshStandardMaterial color="#596273" roughness={0.3} metalness={0.72} />
        </mesh>

        {/* === JOINT (sphere) === */}
        <mesh position={[jointX, jointY, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#9aa5b5" roughness={0.25} metalness={0.8} />
        </mesh>

        {/* === UPPER ARM === */}
        <mesh
          position={[
            jointX + (headX - jointX) / 2,
            jointY + (headY - jointY) / 2,
            0,
          ]}
          rotation={[0, 0, -(lowerArmAngle + upperArmAngle)]}
          castShadow
        >
          <boxGeometry args={[0.035, upperArmLen, 0.035]} />
          <meshStandardMaterial color="#596273" roughness={0.3} metalness={0.72} />
        </mesh>

        {/* === LAMP HEAD === */}
        <group position={[headX, headY, 0]}>
          {/* Head cone/shade */}
          <mesh rotation={[0, 0, -(lowerArmAngle + upperArmAngle)]} castShadow>
            <coneGeometry args={[0.1, 0.14, 16, 1, true]} />
            <meshStandardMaterial
              color="#303846"
              roughness={0.32}
              metalness={0.68}
              side={2}
            />
          </mesh>

          {/* Cap on top of shade */}
          <mesh
            position={[
              Math.sin(lowerArmAngle + upperArmAngle) * 0.07,
              Math.cos(lowerArmAngle + upperArmAngle) * 0.07,
              0,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#444444" roughness={0.4} metalness={0.6} />
          </mesh>

          {/* Bulb */}
          <mesh
            position={[
              -Math.sin(lowerArmAngle + upperArmAngle) * 0.04,
              -Math.cos(lowerArmAngle + upperArmAngle) * 0.04,
              0,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              ref={bulbRef}
              color="#fff5e0"
              emissive="#fbbf24"
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>

          {/* Point light at bulb */}
          <pointLight
            position={[
              -Math.sin(lowerArmAngle + upperArmAngle) * 0.05,
              -Math.cos(lowerArmAngle + upperArmAngle) * 0.05,
              0,
            ]}
            color="#fbbf24"
            intensity={1.5}
            distance={3.5}
            decay={2}
          />
        </group>
      </group>
    </group>
  );
}
