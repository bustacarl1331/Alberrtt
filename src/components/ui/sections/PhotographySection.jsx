import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { photographyData } from '../../../data/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Placeholder gradients for photo cards
const gradients = [
  'linear-gradient(135deg, #1a1a3e, #2d1b69)',
  'linear-gradient(135deg, #1b2a3e, #1a3a4e)',
  'linear-gradient(135deg, #2a1a1e, #3e1a2e)',
  'linear-gradient(135deg, #1a2a1e, #1e3a2e)',
  'linear-gradient(135deg, #2e2a1a, #3e3a1a)',
  'linear-gradient(135deg, #1a1a2e, #2a2a4e)',
];

export default function PhotographySection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-2 gap-3">
        {(photographyData || []).map((photo, i) => (
          <motion.div
            key={i}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            style={{ aspectRatio: '4/3' }}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            {/* Placeholder gradient background */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{
                background: gradients[i % gradients.length],
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '0.75rem',
              }}
            >
              <Camera
                size={24}
                className="text-gray-500 group-hover:text-gray-400 transition-colors"
              />
              <span className="text-gray-500 text-[10px] text-center px-2 group-hover:text-gray-400 transition-colors">
                Photo Coming Soon
              </span>
            </div>

            {/* Title overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 p-3"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              <p className="text-white text-xs font-medium truncate">
                {photo.title || photo.name || `Photo ${i + 1}`}
              </p>
              {photo.category && (
                <p className="text-gray-400 text-[10px] mt-0.5">
                  {photo.category}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {(!photographyData || photographyData.length === 0) && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Camera size={40} className="text-gray-600 mb-3" />
          <p className="text-gray-500 text-sm">Gallery coming soon</p>
        </div>
      )}
    </motion.div>
  );
}
