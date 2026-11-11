import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Github } from '../Icons'
import { projectsData } from '../../../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function ProjectsSection() {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {(projectsData || []).map((project, i) => (
        <motion.div
          key={i}
          className="rounded-xl p-6 transition-all duration-300 group"
          style={{
            backgroundColor: '#1a1a2e',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          variants={cardVariants}
          whileHover={{
            borderColor: 'rgba(251, 191, 36, 0.3)',
            backgroundColor: 'rgba(26, 26, 46, 0.95)',
          }}
        >
          {/* Header row */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-white font-bold text-lg">{project.title}</h3>
            {project.status && (
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ml-3"
                style={{
                  backgroundColor:
                    project.status === 'Completed'
                      ? 'rgba(34, 197, 94, 0.1)'
                      : 'rgba(251, 191, 36, 0.1)',
                  color:
                    project.status === 'Completed' ? '#22c55e' : '#fbbf24',
                  border: `1px solid ${
                    project.status === 'Completed'
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(251, 191, 36, 0.2)'
                  }`,
                }}
              >
                {project.status}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech tags */}
          {project.technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, j) => (
                <span
                  key={j}
                  className="text-xs px-2.5 py-1 rounded-full font-mono"
                  style={{
                    backgroundColor: 'rgba(6, 182, 212, 0.08)',
                    color: '#22d3ee',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-white transition-colors"
              >
                <Github size={14} />
                <span>Source</span>
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                <span>Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
