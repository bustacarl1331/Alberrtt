import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
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
            color="#102536"
            emissive="#2bb8ed"
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>

        {isActive && (
          <Html
            transform
            position={[0, 0.31, 0.035]}
            rotation={[0, 0, 0]}
            distanceFactor={5.8}
            style={{ pointerEvents: 'none' }}
          >
            <div className="laptop-screen-ui">
              <div className="laptop-screen-kicker">PROFILE / 01</div>
              <div className="laptop-screen-title">{aboutData.name}</div>
              <div className="laptop-screen-role">{aboutData.title}</div>
              <div className="laptop-screen-rule" />
              <div className="laptop-screen-copy">
                {aboutData.bio?.[0] || 'Building thoughtful hardware and software experiences.'}
              </div>
              <div className="laptop-screen-meta">
                {educationData.branch} · {educationData.duration}
              </div>
            </div>
          </Html>
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
