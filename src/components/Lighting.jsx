import React from 'react'

export default function Lighting() {
  return (
    <>
      {/* Low neutral fill keeps the scene readable without flattening shadows. */}
      <ambientLight intensity={0.32} color="#6d7892" />

      {/* Visible overhead fixture and warm pool of light */}
      <mesh position={[0, 4.85, -0.15]}>
        <sphereGeometry args={[0.16, 16, 8]} />
        <meshStandardMaterial
          color="#fff4cc"
          emissive="#ffb347"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[0, 4.65, -0.15]}
        intensity={4.5}
        color="#ffb347"
        distance={12}
        decay={1.7}
        castShadow
      />

      {/* Broad warm key light aimed at the work surface */}
      <spotLight
        position={[0, 5.8, 0.25]}
        angle={1.05}
        penumbra={0.85}
        intensity={3.2}
        color="#ffd18a"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0002}
        shadow-normalBias={0.03}
        shadow-camera-near={1}
        shadow-camera-far={15}
      />

      {/* Warm side fill from the lamp side */}
      <pointLight
        position={[2.1, 1.7, -0.55]}
        intensity={1.2}
        color="#ff9d52"
        distance={4.5}
        decay={2}
      />

      {/* Cool rim separates the props from the dark background */}
      <directionalLight
        position={[-4, 3.5, -4]}
        intensity={0.45}
        color="#79b8e8"
      />

      {/* Soft front fill protects dark materials from clipping to black */}
      <directionalLight
        position={[2, 3, 5]}
        intensity={0.35}
        color="#f5d6ad"
      />

      {/* Hemisphere light for overall soft fill */}
      <hemisphereLight
        args={['#27304f', '#17110d', 0.4]}
      />
    </>
  )
}
