import { motion } from 'framer-motion'
import { Cpu, Camera, Zap, Code, Lightbulb, Wrench } from 'lucide-react'
import { interestsData } from '../../../data/content'

const iconMap = {
  Cpu,
  Camera,
  Zap,
  Code,
  Lightbulb,
  Wrench,
}

// Fallback icon order if interest doesn't specify an icon
const fallbackIcons = [Cpu, Code, Zap, Camera, Lightbulb, Wrench]

const interestDescriptions = {
  'Technology Experimentation': 'Tinkering with emerging tech stacks, novel architectures, and hardware-software prototypes.',
  'Photography': 'Capturing textures, light, framing, and quiet moments through digital manual photography.',
  'Electronics': 'Circuit prototyping, microcontrollers, sensor integration, and signal analysis.',
  'Software Development': 'Writing clean, reactive, and scalable applications with modern toolchains.',
  'Creative Projects': 'Interactive visual experiences, 3D graphics, generative design, and creative coding.',
  'Embedded Systems': 'Firmware programming, RTOS basics, communication protocols (I2C, SPI, UART), and IoT devices.',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

export default function InterestsSection() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {(interestsData || []).map((interest, i) => {
        const title = typeof interest === 'string' ? interest : (interest.title || interest.name)
        const desc = typeof interest === 'string'
          ? (interestDescriptions[interest] || 'Exploring and creating with passion.')
          : interest.description

        const IconComponent =
          (typeof interest === 'object' && interest.icon && iconMap[interest.icon]) ||
          fallbackIcons[i % fallbackIcons.length]

        return (
          <motion.div
            key={i}
            className="rounded-xl p-5 group cursor-default transition-all"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
            variants={cardVariants}
            whileHover={{
              borderColor: 'rgba(251, 191, 36, 0.3)',
              backgroundColor: 'rgba(26, 26, 46, 0.85)',
              y: -2,
            }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="p-2.5 rounded-lg inline-flex mb-3"
              style={{
                backgroundColor: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.15)',
              }}
            >
              <IconComponent
                size={20}
                className="transition-colors duration-200"
                style={{ color: '#fbbf24' }}
              />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1.5">
              {title}
            </h3>
            {desc && (
              <p className="text-gray-400 text-xs leading-relaxed">
                {desc}
              </p>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
