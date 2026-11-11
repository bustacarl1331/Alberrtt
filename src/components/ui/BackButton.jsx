import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import usePortfolioStore from '../../store/usePortfolioStore'

export default function BackButton() {
  const { goBack } = usePortfolioStore()

  return (
    <motion.button
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer"
      style={{
        backgroundColor: 'rgba(15, 15, 26, 0.9)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        color: '#fbbf24',
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, y: 20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 20, x: '-50%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)',
        borderColor: 'rgba(251, 191, 36, 0.6)',
      }}
      whileTap={{ scale: 0.95 }}
      onClick={goBack}
    >
      <ArrowLeft size={16} />
      <span>Back to Desk</span>
    </motion.button>
  )
}
