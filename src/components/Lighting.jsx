import React from 'react'

export default function Lighting() {
  return (
    <>
      {/* Ambient fill - cool blue */}
      <ambientLight intensity={0.2} color="#4a6fa5" />

      {/* Visible overhead fixture and warm pool of light */}
      <mesh position={[0, 4.85, 0]}>
        <sphereGeometry args={[0.16, 16, 8]} />
        <meshStandardMaterial
          color="#fff4cc"
          emissive="#ffb347"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[0, 4.65, 0]}
        intensity={3.5}
        color="#ffb347"
        distance={12}
        decay={1.5}
        castShadow
      />

      {/* Main overhead warm spotlight */}
      <spotLight
        position={[0, 5.5, 0]}
        angle={0.9}
        penumbra={0.7}
        intensity={2}
        color="#ffc15a"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
        shadow-camera-near={1}
        shadow-camera-far={15}
      />

      {/* Secondary warm fill - from desk lamp area */}
      <pointLight
        position={[2.2, 1.8, -0.8]}
        intensity={0.6}
        color="#fbbf24"
        distance={4}
        decay={2}
      />

      {/* Cool rim light from back */}
      <directionalLight
        position={[-3, 4, -4]}
        intensity={0.2}
        color="#64a0c8"
      />

      {/* Subtle front fill */}
      <directionalLight
        position={[2, 2, 4]}
        intensity={0.1}
        color="#d4a574"
      />

      {/* Hemisphere light for overall soft fill */}
      <hemisphereLight
        args={['#1a1a3a', '#0d0d12', 0.3]}
      />
    </>
  )
}
