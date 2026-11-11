import { motion } from 'framer-motion'
import { Mail, Download, ExternalLink } from 'lucide-react'
import { Github, Linkedin } from '../Icons'
import { contactData, profileConfig } from '../../../data/content'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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

export default function ContactSection() {
  const contacts = [
    {
      name: 'Email',
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      icon: Mail,
    },
    {
      name: 'GitHub',
      value: contactData.github,
      href: contactData.github,
      icon: Github,
    },
    {
      name: 'LinkedIn',
      value: contactData.linkedin,
      href: contactData.linkedin,
      icon: Linkedin,
    },
  ]

  const availableContacts = contacts.filter((contact) => contact.value)

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.div variants={itemVariants}>
        <h2
          className="text-3xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f97316)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Let's Connect
        </h2>
        <p className="text-gray-400 text-sm">
          Feel free to reach out for collaborations, project discussions, or inquiries.
        </p>
      </motion.div>

      {/* Contact cards */}
      <div className="space-y-3">
        {availableContacts.map((contact, i) => {
          const IconComponent = contact.icon

          return (
            <motion.a
              key={i}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl p-4 transition-all duration-200 group cursor-pointer block"
              style={{
                backgroundColor: 'rgba(26, 26, 46, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
              variants={itemVariants}
              whileHover={{
                borderColor: 'rgba(251, 191, 36, 0.3)',
                backgroundColor: 'rgba(26, 26, 46, 0.85)',
              }}
            >
              <div
                className="p-2.5 rounded-lg shrink-0"
                style={{
                  backgroundColor: 'rgba(251, 191, 36, 0.08)',
                  border: '1px solid rgba(251, 191, 36, 0.12)',
                }}
              >
                <IconComponent size={20} style={{ color: '#fbbf24' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">
                  {contact.name}
                </p>
                <p className="text-gray-400 text-xs truncate">
                  {contact.value}
                </p>
              </div>
              <ExternalLink
                size={14}
                className="text-gray-500 group-hover:text-amber-400 transition-colors shrink-0"
              />
            </motion.a>
          )
        })}
      </div>

      {profileConfig.privateMode && availableContacts.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="rounded-xl p-4 text-sm text-gray-400"
          style={{
            backgroundColor: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.12)',
          }}
        >
          Contact details are private for now. Add your email and profile links in
          <code className="mx-1 text-amber-400">src/data/content.js</code>
          when you are ready.
        </motion.div>
      )}

      {/* Download Resume button */}
      {contactData.resume && (
        <motion.div variants={itemVariants} className="pt-2">
          <motion.a
          href={contactData.resume}
          download="resume.pdf"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            color: '#fbbf24',
          }}
          whileHover={{
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.15)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={16} />
          <span>Download Resume</span>
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  )
}
