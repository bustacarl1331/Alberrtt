import { motion } from 'framer-motion'
import usePortfolioStore from '../../store/usePortfolioStore'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function LandingOverlay() {
  const { setEntered } = usePortfolioStore()

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
      style={{ backgroundColor: 'rgba(10, 10, 15, 0.88)' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="flex flex-col items-center gap-6 px-6 text-center max-w-xl"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          variants={itemVariants}
        >
          The Engineer's Desk
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 text-lg md:text-xl font-medium tracking-wide"
          variants={itemVariants}
        >
          Albert Shony <span className="text-amber-400">•</span> ECE Student
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-gray-400 text-sm max-w-md"
          variants={itemVariants}
        >
          An interactive 3D miniature workspace showcasing embedded systems, computer vision, and engineering projects.
        </motion.p>

        {/* Enter button */}
        <motion.button
          className="relative mt-4 px-8 py-3.5 rounded-xl border text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer glow-border"
          style={{
            borderColor: 'rgba(251, 191, 36, 0.6)',
            color: '#fbbf24',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
          }}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 35px rgba(251, 191, 36, 0.35)',
            borderColor: 'rgba(251, 191, 36, 0.9)',
            backgroundColor: 'rgba(251, 191, 36, 0.18)',
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setEntered(true)}
        >
          <span className="relative z-10">Enter the Workspace</span>
        </motion.button>

        {/* Instruction text */}
        <motion.p
          className="text-gray-500 text-xs mt-2"
          variants={itemVariants}
        >
          Hover over objects to inspect &bull; Click to explore sections
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
