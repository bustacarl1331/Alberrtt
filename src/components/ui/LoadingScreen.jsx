import { motion } from 'framer-motion'

export default function LoadingScreen({ progress = 0 }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto"
      style={{ backgroundColor: '#0a0a0f' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Decorative circuit lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left corner circuit */}
        <div
          className="absolute top-12 left-12 w-32 h-32"
          style={{
            borderLeft: '1px solid rgba(251, 191, 36, 0.15)',
            borderTop: '1px solid rgba(251, 191, 36, 0.15)',
          }}
        />
        <div
          className="absolute top-12 left-12 w-16 h-16"
          style={{
            borderLeft: '1px solid rgba(251, 191, 36, 0.25)',
            borderTop: '1px solid rgba(251, 191, 36, 0.25)',
          }}
        />
        {/* Top-right corner circuit */}
        <div
          className="absolute top-12 right-12 w-32 h-32"
          style={{
            borderRight: '1px solid rgba(251, 191, 36, 0.15)',
            borderTop: '1px solid rgba(251, 191, 36, 0.15)',
          }}
        />
        <div
          className="absolute top-12 right-12 w-16 h-16"
          style={{
            borderRight: '1px solid rgba(251, 191, 36, 0.25)',
            borderTop: '1px solid rgba(251, 191, 36, 0.25)',
          }}
        />
        {/* Bottom-left corner circuit */}
        <div
          className="absolute bottom-12 left-12 w-32 h-32"
          style={{
            borderLeft: '1px solid rgba(251, 191, 36, 0.15)',
            borderBottom: '1px solid rgba(251, 191, 36, 0.15)',
          }}
        />
        {/* Bottom-right corner circuit */}
        <div
          className="absolute bottom-12 right-12 w-32 h-32"
          style={{
            borderRight: '1px solid rgba(251, 191, 36, 0.15)',
            borderBottom: '1px solid rgba(251, 191, 36, 0.15)',
          }}
        />
        {/* Horizontal center lines */}
        <motion.div
          className="absolute top-1/2 left-0 h-px"
          style={{ backgroundColor: 'rgba(251, 191, 36, 0.08)' }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        <motion.h1
          className="text-3xl md:text-5xl font-bold tracking-tight text-center"
          style={{ color: '#fbbf24' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          The Engineer's Desk
        </motion.h1>

        <motion.p
          className="text-gray-400 text-xs md:text-sm tracking-widest uppercase font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Initializing 3D Workspace...
        </motion.p>

        {/* Progress bar */}
        <div className="w-64 md:w-80 space-y-2">
          <div
            className="h-[3px] w-full rounded-full overflow-hidden bg-gray-800"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-gray-500">
            <span>LOW-POLY DIORAMA</span>
            <span className="text-amber-400/80">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
