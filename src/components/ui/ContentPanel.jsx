import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { lazy, Suspense } from 'react';
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

export default function ContentPanel() {
  const { activeSection, goBack } = usePortfolioStore();
  const SectionComponent = activeSection ? sectionComponents[activeSection] : null;

  return (
    <AnimatePresence mode="wait">
      {activeSection && SectionComponent && (
        <motion.div
          key={activeSection}
          className="fixed top-0 right-0 h-full z-40 w-full md:w-[45%] lg:w-[40%] overflow-hidden"
          style={{
            backgroundColor: 'rgba(15, 15, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(251, 191, 36, 0.15)',
          }}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2
              className="text-lg font-semibold tracking-wide"
              style={{ color: '#fbbf24' }}
            >
              {sectionTitles[activeSection] || activeSection}
            </h2>
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
          <div className="h-[calc(100%-60px)] overflow-y-auto px-6 py-6 custom-scrollbar">
            <SectionComponent />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
