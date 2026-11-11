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

  // Arm angles
  const lowerArmAngle = (-60 * Math.PI) / 180;
  const upperArmAngle = (30 * Math.PI) / 180;

  // Dimensions
  const lowerArmLen = 0.4;
  const upperArmLen = 0.35;

  // Calculate joint position (end of lower arm)
  const jointX = Math.sin(-lowerArmAngle) * lowerArmLen;
  const jointY = Math.cos(-lowerArmAngle) * lowerArmLen;

  // Calculate lamp head position (end of upper arm, relative to joint)
  const headDx = Math.sin(-lowerArmAngle + upperArmAngle) * upperArmLen;
  const headDy = Math.cos(-lowerArmAngle + upperArmAngle) * upperArmLen;

  const headX = jointX + headDx;
  const headY = jointY + headDy;

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
      {...props}
    >
      {/* === BASE === */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.15, 0.16, 0.03, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.6} />
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
          rotation={[0, 0, lowerArmAngle]}
        >
          <boxGeometry args={[0.025, lowerArmLen, 0.025]} />
          <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* === JOINT (sphere) === */}
        <mesh position={[jointX, jointY, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#555555" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* === UPPER ARM === */}
        <mesh
          position={[
            jointX + headDx / 2,
            jointY + headDy / 2,
            0,
          ]}
          rotation={[0, 0, lowerArmAngle - upperArmAngle]}
        >
          <boxGeometry args={[0.025, upperArmLen, 0.025]} />
          <meshStandardMaterial color="#444444" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* === LAMP HEAD === */}
        <group position={[headX, headY, 0]}>
          {/* Head cone/shade */}
          <mesh rotation={[0, 0, lowerArmAngle - upperArmAngle + Math.PI]}>
            <coneGeometry args={[0.08, 0.1, 12, 1, true]} />
            <meshStandardMaterial
              color="#333333"
              roughness={0.5}
              metalness={0.5}
              side={2}
            />
          </mesh>

          {/* Cap on top of shade */}
          <mesh
            position={[
              Math.sin(lowerArmAngle - upperArmAngle) * 0.05,
              Math.cos(lowerArmAngle - upperArmAngle) * 0.05,
              0,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#444444" roughness={0.4} metalness={0.6} />
          </mesh>

          {/* Bulb */}
          <mesh
            position={[
              -Math.sin(lowerArmAngle - upperArmAngle) * 0.025,
              -Math.cos(lowerArmAngle - upperArmAngle) * 0.025,
              0,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              ref={bulbRef}
              color="#fff5e0"
              emissive="#fbbf24"
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>

          {/* Point light at bulb */}
          <pointLight
            position={[
              -Math.sin(lowerArmAngle - upperArmAngle) * 0.04,
              -Math.cos(lowerArmAngle - upperArmAngle) * 0.04,
              0,
            ]}
            color="#fbbf24"
            intensity={0.8}
            distance={3}
            decay={2}
          />
        </group>
      </group>
    </group>
  );
}
