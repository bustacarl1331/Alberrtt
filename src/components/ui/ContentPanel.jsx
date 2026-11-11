import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import usePortfolioStore from '../../store/usePortfolioStore';

// Import section components
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import AchievementsSection from './sections/AchievementsSection';
import PhotographySection from './sections/PhotographySection';
import InterestsSection from './sections/InterestsSection';
import ContactSection from './sections/ContactSection';
import ResumeSection from './sections/ResumeSection';

const sectionComponents = {
  about: AboutSection,
  projects: ProjectsSection,
  achievements: AchievementsSection,
  photography: PhotographySection,
  interests: InterestsSection,
  contact: ContactSection,
  resume: ResumeSection,
};

const sectionTitles = {
  about: 'About Me',
  projects: 'Projects',
  achievements: 'Achievements',
  photography: 'Photography',
  interests: 'Interests',
  contact: 'Contact',
  resume: 'Resume',
};

const sectionDescriptions = {
  about: 'A focused view of the person behind the work.',
  projects: 'Selected experiments, builds, and engineering systems.',
  achievements: 'Milestones that shaped the journey so far.',
  photography: 'A visual archive, ready for your own images.',
  interests: 'The ideas and disciplines that keep the desk active.',
  contact: 'A direct line for thoughtful collaboration.',
  resume: 'A concise professional snapshot.',
};

export default function ContentPanel() {
  const { activeSection, goBack } = usePortfolioStore();
  const SectionComponent = activeSection ? sectionComponents[activeSection] : null;

  return (
    <AnimatePresence mode="wait">
      {activeSection && SectionComponent && (
        <motion.div
          key={activeSection}
          className="fixed top-0 right-0 h-full z-40 w-full md:w-[46%] lg:w-[42%] max-w-[620px] overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(20, 24, 37, 0.97), rgba(11, 13, 22, 0.98))',
            backdropFilter: 'blur(28px)',
            borderLeft: '1px solid rgba(251, 191, 36, 0.24)',
            boxShadow: '-24px 0 80px rgba(0, 0, 0, 0.38)',
          }}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-5 px-7 py-6 border-b border-white/10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/70 mb-2">
                Engineer's Desk / {String(activeSection).replace('-', ' ')}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                {sectionTitles[activeSection] || activeSection}
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-sm">
                {sectionDescriptions[activeSection]}
              </p>
            </div>
            <motion.button
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{ color: 'rgba(156, 163, 175, 1)' }}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={goBack}
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Scrollable content */}
          <div className="h-[calc(100%-116px)] overflow-y-auto px-7 py-7 custom-scrollbar">
            <div className="relative">
              <div className="absolute -top-7 left-0 h-px w-20 bg-gradient-to-r from-amber-300 to-transparent" />
              <SectionComponent />
              <div className="mt-10 pt-5 border-t border-white/10 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                <ArrowUpRight size={13} className="text-amber-300" />
                Explore the desk to move between sections
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
