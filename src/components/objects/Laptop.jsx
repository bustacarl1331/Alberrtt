import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { aboutData, educationData } from '../../data/content';

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
      <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.055, 0.72]} />
        <meshStandardMaterial color="#252932" roughness={0.42} metalness={0.55} />
      </mesh>

      {/* === KEYBOARD KEYS === */}
      {keys.map((k, i) => (
        <mesh key={i} position={[k.x, 0.045, k.z]}>
          <boxGeometry args={[0.054, 0.01, 0.045]} />
          <meshStandardMaterial color="#11151b" roughness={0.72} metalness={0.12} />
        </mesh>
      ))}

      {/* === TRACKPAD === */}
      <mesh position={[0, 0.058, 0.19]}>
        <boxGeometry args={[0.22, 0.005, 0.14]} />
        <meshStandardMaterial color="#333a45" roughness={0.35} metalness={0.35} />
      </mesh>

      {/* === SCREEN HINGE AREA === */}
      <group position={[0, 0.055, -0.33]}>
        <mesh position={[-0.28, 0.015, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.16, 16]} />
          <meshStandardMaterial color="#566170" roughness={0.28} metalness={0.8} />
        </mesh>
        <mesh position={[0.28, 0.015, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.16, 16]} />
          <meshStandardMaterial color="#566170" roughness={0.28} metalness={0.8} />
        </mesh>
        {/* Screen frame */}
        <mesh position={[0, 0.31, 0]} castShadow>
          <boxGeometry args={[0.98, 0.6, 0.035]} />
          <meshStandardMaterial color="#161b22" roughness={0.34} metalness={0.6} />
        </mesh>

        {/* Screen face (emissive) */}
        <mesh position={[0, 0.31, 0.02]}>
          <boxGeometry args={[0.86, 0.48, 0.008]} />
          <meshStandardMaterial
            ref={screenMatRef}
            color="#071722"
            emissive="#0b3347"
            emissiveIntensity={0.9}
            toneMapped={false}
          />
        </mesh>

        {(
          <group position={[0, 0, 0.031]}>
            <mesh position={[-0.29, 0.43, 0]}>
              <planeGeometry args={[0.72, 0.018]} />
              <meshBasicMaterial color="#67e8f9" toneMapped={false} />
            </mesh>
            <Text
              position={[-0.39, 0.49, 0.004]}
              fontSize={0.045}
              maxWidth={0.72}
              anchorX="left"
              anchorY="top"
              color="#67e8f9"
            >
              PROFILE / 01
            </Text>
            <Text
              position={[-0.39, 0.39, 0.004]}
              fontSize={0.075}
              maxWidth={0.72}
              anchorX="left"
              anchorY="top"
              color="#ffffff"
            >
              {aboutData.name}
            </Text>
            <Text
              position={[-0.39, 0.29, 0.004]}
              fontSize={0.032}
              maxWidth={0.72}
              anchorX="left"
              anchorY="top"
              color="#fbbf24"
            >
              {aboutData.title}
            </Text>
            <mesh position={[-0.19, 0.18, 0]}>
              <planeGeometry args={[0.5, 0.012]} />
              <meshBasicMaterial color="#1e6b83" toneMapped={false} />
            </mesh>
            <Text
              position={[-0.39, 0.12, 0.004]}
              fontSize={0.024}
              maxWidth={0.72}
              lineHeight={1.35}
              anchorX="left"
              anchorY="top"
              color="#b6d5df"
            >
              {aboutData.bio?.[0] || 'Building thoughtful hardware and software experiences.'}
            </Text>
            <Text
              position={[-0.39, -0.13, 0.004]}
              fontSize={0.021}
              maxWidth={0.72}
              anchorX="left"
              anchorY="top"
              color="#7dd3fc"
            >
              {educationData.branch}
            </Text>
          </group>
        )}

        {/* Webcam dot */}
        <mesh position={[0, 0.57, 0.022]}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1.5} />
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
