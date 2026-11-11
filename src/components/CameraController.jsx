import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import usePortfolioStore from '../store/usePortfolioStore'
import { navObjects } from '../data/content'

const DEFAULT_CAMERA_POS = new THREE.Vector3(4.6, 5.4, 4.8)
const DEFAULT_LOOK_AT = new THREE.Vector3(0, 0.5, 0)

export default function CameraController() {
  const { camera } = useThree()
  const { activeSection, isEntered, setCameraTransitioning } = usePortfolioStore()
  const lookAtTarget = useRef(DEFAULT_LOOK_AT.clone())
  const isAnimating = useRef(false)

  // Set initial camera
  useEffect(() => {
    camera.position.copy(DEFAULT_CAMERA_POS)
    camera.lookAt(DEFAULT_LOOK_AT)
  }, [camera])

  // Reset camera listener
  useEffect(() => {
    const handleReset = () => {
      isAnimating.current = true
      setCameraTransitioning(true)

      gsap.to(camera.position, {
        x: DEFAULT_CAMERA_POS.x,
        y: DEFAULT_CAMERA_POS.y,
        z: DEFAULT_CAMERA_POS.z,
        duration: 1.2,
        ease: 'power2.inOut',
      })

      gsap.to(lookAtTarget.current, {
        x: DEFAULT_LOOK_AT.x,
        y: DEFAULT_LOOK_AT.y,
        z: DEFAULT_LOOK_AT.z,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating.current = false
          setCameraTransitioning(false)
        },
      })
    }

    window.addEventListener('resetCamera', handleReset)
    return () => window.removeEventListener('resetCamera', handleReset)
  }, [camera, setCameraTransitioning])

  // Handle section changes
  useEffect(() => {
    if (!isEntered) return

    if (activeSection) {
      const navObj = navObjects.find((o) => o.id === activeSection)
      if (!navObj) return

      isAnimating.current = true
      setCameraTransitioning(true)

      const targetPos = new THREE.Vector3(...navObj.cameraPosition)
      const targetLookAt = new THREE.Vector3(...navObj.cameraTarget)

      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.2,
        ease: 'power2.inOut',
      })

      gsap.to(lookAtTarget.current, {
        x: targetLookAt.x,
        y: targetLookAt.y,
        z: targetLookAt.z,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating.current = false
          setCameraTransitioning(false)
        },
      })
    } else {
      // Return to default
      isAnimating.current = true
      setCameraTransitioning(true)

      gsap.to(camera.position, {
        x: DEFAULT_CAMERA_POS.x,
        y: DEFAULT_CAMERA_POS.y,
        z: DEFAULT_CAMERA_POS.z,
        duration: 1.2,
        ease: 'power2.inOut',
      })

      gsap.to(lookAtTarget.current, {
        x: DEFAULT_LOOK_AT.x,
        y: DEFAULT_LOOK_AT.y,
        z: DEFAULT_LOOK_AT.z,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating.current = false
          setCameraTransitioning(false)
        },
      })
    }
  }, [activeSection, isEntered, camera, setCameraTransitioning])

  useFrame(() => {
    camera.lookAt(lookAtTarget.current)
  })

  return null
}
