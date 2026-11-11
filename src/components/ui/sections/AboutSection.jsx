import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { aboutData, skillsData, educationData } from '../../../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function AboutSection() {
  const skillCategories = Array.isArray(skillsData)
    ? skillsData
    : Object.entries(skillsData || {}).map(([name, items]) => ({
        name,
        skills: items,
      }))

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Name and title */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-white mb-1">
          {aboutData?.name || 'Albert Shony'}
        </h1>
        <p className="text-amber-400 text-lg font-medium">
          {aboutData?.title || 'Electronics & Communication Engineering Student'}
        </p>
        {aboutData?.tagline && (
          <p className="text-gray-400 text-xs mt-1 italic">
            "{aboutData.tagline}"
          </p>
        )}
      </motion.div>

      {/* Bio */}
      <motion.div className="space-y-3" variants={itemVariants}>
        {(aboutData?.bio || [aboutData?.description || '']).map((paragraph, i) => (
          <p key={i} className="text-gray-300 leading-relaxed text-sm">
            {paragraph}
          </p>
        ))}
      </motion.div>

      {/* Education */}
      {educationData && (
        <motion.div variants={itemVariants}>
          <h3
            className="text-lg font-semibold mb-3 flex items-center gap-2"
            style={{ color: '#fbbf24' }}
          >
            <GraduationCap size={20} />
            Education
          </h3>
          <div
            className="rounded-xl p-5 space-y-2"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <p className="text-white font-medium">
              {educationData.degree || educationData.program}
            </p>
            <p className="text-amber-400/90 text-sm font-medium">
              {educationData.branch}
            </p>
            <p className="text-gray-400 text-sm">
              {educationData.college || educationData.institution}
            </p>
            {educationData.university && (
              <p className="text-gray-500 text-sm">{educationData.university}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {educationData.duration || educationData.year}
            </p>
          </div>
        </motion.div>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#fbbf24' }}>
            Technical Skills
          </h3>
          <div className="space-y-4">
            {skillCategories.map((category, i) => (
              <motion.div
                key={i}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                variants={itemVariants}
              >
                <h4 className="text-white text-sm font-semibold mb-3">
                  {category.name || category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(category.skills || category.items || []).map((skill, j) => (
                    <span
                      key={j}
                      className="bg-gray-800/80 text-gray-300 border border-gray-700/60 px-3 py-1 rounded-full text-xs font-mono"
                    >
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
