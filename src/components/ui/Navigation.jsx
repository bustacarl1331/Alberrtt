import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, RotateCcw } from 'lucide-react'
import { Github, Linkedin } from './Icons'
import { useState } from 'react'
import usePortfolioStore from '../../store/usePortfolioStore'
import { contactData } from '../../data/content'

function NavIcon({ icon: Icon, label, href, onClick }) {
  const [hovered, setHovered] = useState(false)

  const content = (
    <motion.div
      className="relative p-2 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Icon size={18} className="text-gray-400 hover:text-white transition-colors duration-200" />
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-[10px] text-gray-300 bg-gray-900 rounded whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )

  if (href && href !== '#') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

export default function Navigation() {
  const { isEntered, soundEnabled, toggleSound, goBack } = usePortfolioStore()

  const githubLink = contactData?.github || '#'
  const linkedinLink = contactData?.linkedin || '#'

  return (
    <AnimatePresence>
      {isEntered && (
        <motion.nav
          className="fixed top-4 right-4 z-40 flex items-center gap-1 px-3 py-2 rounded-full"
          style={{
            backgroundColor: 'rgba(15, 15, 26, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <NavIcon icon={Github} label="GitHub" href={githubLink} />
          <NavIcon icon={Linkedin} label="LinkedIn" href={linkedinLink} />
          <div className="w-px h-4 bg-gray-700 mx-1" />
          <NavIcon
            icon={soundEnabled ? Volume2 : VolumeX}
            label={soundEnabled ? 'Mute' : 'Unmute'}
            onClick={toggleSound}
          />
          <NavIcon
            icon={RotateCcw}
            label="Reset View"
            onClick={() => {
              goBack()
              window.dispatchEvent(new CustomEvent('resetCamera'))
            }}
          />
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
