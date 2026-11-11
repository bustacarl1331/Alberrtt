import { motion } from 'framer-motion'
import { Download, GraduationCap, FileText } from 'lucide-react'
import { Github, Linkedin } from '../Icons'
import { contactData, educationData, skillsData } from '../../../data/content'

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

export default function ResumeSection() {
  const githubLink = contactData?.github || '#'
  const linkedinLink = contactData?.linkedin || '#'

  // Format skills whether skillsData is an object or array
  const skillCategories = Array.isArray(skillsData)
    ? skillsData
    : Object.entries(skillsData || {}).map(([name, items]) => ({
        name,
        skills: items,
      }))

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Education summary */}
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

      {/* Skills overview */}
      {skillCategories.length > 0 && (
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-3" style={{ color: '#fbbf24' }}>
            Skills Overview
          </h3>
          <div className="space-y-3">
            {skillCategories.map((category, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <h4 className="text-white text-sm font-semibold mb-2">
                  {category.name || category.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(category.skills || category.items || []).map((skill, j) => (
                    <span
                      key={j}
                      className="bg-gray-800/80 text-gray-300 border border-gray-700/50 px-2.5 py-0.5 rounded-full text-xs"
                    >
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Links */}
      <motion.div variants={itemVariants} className="flex gap-3">
        {githubLink !== '#' && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:border-amber-400/30"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#9ca3af',
            }}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        )}
        {linkedinLink !== '#' && (
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:border-amber-400/30"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#9ca3af',
            }}
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
        )}
      </motion.div>

      {/* Download Resume button */}
      <motion.div variants={itemVariants}>
        <motion.a
          href={contactData?.resume || '#'}
          download="Albert_Shony_Resume.pdf"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(249, 115, 22, 0.15))',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            color: '#fbbf24',
          }}
          whileHover={{
            boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)',
            borderColor: 'rgba(251, 191, 36, 0.7)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={18} />
          <span>Download Resume</span>
        </motion.a>
      </motion.div>

      {/* Placeholder note */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 p-3 rounded-lg"
        style={{
          backgroundColor: 'rgba(251, 191, 36, 0.05)',
          border: '1px solid rgba(251, 191, 36, 0.1)',
        }}
      >
        <FileText size={14} style={{ color: '#fbbf24' }} />
        <p className="text-gray-400 text-xs">
          Resume PDF coming soon. Connect on LinkedIn or GitHub for the latest updates.
        </p>
      </motion.div>
    </motion.div>
  )
}
