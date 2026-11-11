import React from 'react'
import { ContactShadows } from '@react-three/drei'
import Desk from './Desk'
import Lighting from './Lighting'
import CameraController from './CameraController'
import Props from './Props'
import InteractiveObject from './objects/InteractiveObject'
import Laptop from './objects/Laptop'
import Arduino from './objects/Arduino'
import Notebook from './objects/Notebook'
import Camera3D from './objects/Camera3D'
import Headphones from './objects/Headphones'
import CoffeeMug from './objects/CoffeeMug'
import DeskLamp from './objects/DeskLamp'
import usePortfolioStore from '../store/usePortfolioStore'
import { navObjects } from '../data/content'

export default function Scene() {
  const hoveredObject = usePortfolioStore((s) => s.hoveredObject)
  const activeSection = usePortfolioStore((s) => s.activeSection)

  const getNavObj = (id) => navObjects.find((o) => o.id === id)

  return (
    <>
      <Lighting />
      <CameraController />

      {/* Desk */}
      <Desk />

      {/* Contact Shadows under desk objects */}
      <ContactShadows
        position={[0, 0.79, 0]}
        opacity={0.4}
        scale={8}
        blur={2}
        far={2}
        color="#000000"
      />

      {/* === INTERACTIVE OBJECTS === */}

      {/* Laptop - About Me */}
      <InteractiveObject
        id="about"
        name="About Me"
        subtitle="Who is Albert Shony?"
        position={getNavObj('about')?.position || [-1.5, 0.85, -0.5]}
        seed={1}
      >
        <Laptop
          isHovered={hoveredObject === 'about'}
          isActive={activeSection === 'about'}
        />
      </InteractiveObject>

      {/* Arduino - Projects */}
      <InteractiveObject
        id="projects"
        name="Projects"
        subtitle="Engineering builds & code"
        position={getNavObj('projects')?.position || [1.2, 0.82, -0.3]}
        seed={2}
      >
        <Arduino
          isHovered={hoveredObject === 'projects'}
          isActive={activeSection === 'projects'}
        />
      </InteractiveObject>

      {/* Notebook - Achievements */}
      <InteractiveObject
        id="achievements"
        name="Achievements"
        subtitle="Awards & recognitions"
        position={getNavObj('achievements')?.position || [-0.5, 0.82, 0.8]}
        seed={3}
      >
        <Notebook
          isHovered={hoveredObject === 'achievements'}
          isActive={activeSection === 'achievements'}
        />
      </InteractiveObject>

      {/* Camera - Photography */}
      <InteractiveObject
        id="photography"
        name="Photography"
        subtitle="Through the lens"
        position={getNavObj('photography')?.position || [1.8, 0.82, 0.6]}
        seed={4}
      >
        <Camera3D
          isHovered={hoveredObject === 'photography'}
          isActive={activeSection === 'photography'}
        />
      </InteractiveObject>

      {/* Headphones - Interests */}
      <InteractiveObject
        id="interests"
        name="Interests"
        subtitle="Hobbies & passions"
        position={getNavObj('interests')?.position || [-1.8, 0.82, 0.5]}
        seed={5}
      >
        <Headphones
          isHovered={hoveredObject === 'interests'}
          isActive={activeSection === 'interests'}
        />
      </InteractiveObject>

      {/* Coffee Mug - Contact */}
      <InteractiveObject
        id="contact"
        name="Contact"
        subtitle="Get in touch"
        position={getNavObj('contact')?.position || [0.5, 0.82, -0.8]}
        seed={6}
      >
        <CoffeeMug
          isHovered={hoveredObject === 'contact'}
          isActive={activeSection === 'contact'}
        />
      </InteractiveObject>

      {/* Desk Lamp - Resume */}
      <InteractiveObject
        id="resume"
        name="Resume"
        subtitle="Professional profile"
        position={getNavObj('resume')?.position || [2.2, 0.82, -0.8]}
        seed={7}
      >
        <DeskLamp
          isHovered={hoveredObject === 'resume'}
          isActive={activeSection === 'resume'}
        />
      </InteractiveObject>

      {/* === DECORATIVE PROPS === */}
      <Props />
    </>
  )
}
