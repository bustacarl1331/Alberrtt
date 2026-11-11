import React, { Suspense, useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import usePortfolioStore from './store/usePortfolioStore'
import Scene from './components/Scene'
import LoadingScreen from './components/ui/LoadingScreen'
import LandingOverlay from './components/ui/LandingOverlay'
import Navigation from './components/ui/Navigation'
import ContentPanel from './components/ui/ContentPanel'
import BackButton from './components/ui/BackButton'
import { isMobileDevice, prefersReducedMotion } from './utils/helpers'

export default function App() {
  const { isLoading, isEntered, activeSection, setLoading, setMobile, setReducedMotion } = usePortfolioStore()
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setWebglSupported(false)
    } catch {
      setWebglSupported(false)
    }

    setMobile(isMobileDevice())
    setReducedMotion(prefersReducedMotion())

    // Listen for resize
    const handleResize = () => setMobile(isMobileDevice())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMobile, setReducedMotion])

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading) return
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => setLoading(false), 500)
      }
      setLoadingProgress(Math.min(progress, 100))
    }, 200)
    return () => clearInterval(interval)
  }, [isLoading, setLoading])

  const handleCreated = useCallback((state) => {
    // Pause rendering when tab is hidden
    const handleVisibility = () => {
      state.gl.setAnimationLoop(document.hidden ? null : state.invalidate)
    }
    document.addEventListener('visibilitychange', handleVisibility)
  }, [])

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0f] text-white p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-[#fbbf24]">WebGL Not Supported</h1>
          <p className="text-gray-400 max-w-md">
            This portfolio requires WebGL to render the interactive 3D experience.
            Please try a modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [4, 5, 4], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        onCreated={handleCreated}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 8, 20]} />
        <Suspense fallback={null}>
          <Scene />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" progress={loadingProgress} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && !isEntered && (
          <LandingOverlay key="landing" />
        )}
      </AnimatePresence>

      {isEntered && <Navigation />}

      <AnimatePresence mode="wait">
        {activeSection && (
          <ContentPanel key="content" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeSection && <BackButton key="back" />}
      </AnimatePresence>
    </div>
  )
}
