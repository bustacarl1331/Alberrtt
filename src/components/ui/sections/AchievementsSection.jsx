import { motion } from 'framer-motion';
import { Trophy, Code, Users, Award } from 'lucide-react';
import { achievementsData } from '../../../data/content';

const categoryIcons = {
  awards: Trophy,
  award: Trophy,
  hackathons: Code,
  hackathon: Code,
  coordination: Users,
  leadership: Users,
  certifications: Award,
  certification: Award,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function AchievementsSection() {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {(achievementsData || []).map((achievement, i) => {
        const categoryKey = (achievement.category || '').toLowerCase();
        const IconComponent =
          categoryIcons[categoryKey] || Trophy;

        return (
          <motion.div
            key={i}
            className="rounded-xl p-5 group"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
            variants={cardVariants}
            whileHover={{
              borderColor: 'rgba(251, 191, 36, 0.2)',
            }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className="p-2.5 rounded-lg shrink-0 mt-0.5"
                style={{
                  backgroundColor: 'rgba(251, 191, 36, 0.08)',
                  border: '1px solid rgba(251, 191, 36, 0.12)',
                }}
              >
                <IconComponent size={20} style={{ color: '#fbbf24' }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-white font-semibold text-sm">
                    {achievement.title}
                  </h3>
                  {achievement.category && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-medium"
                      style={{
                        backgroundColor: 'rgba(251, 191, 36, 0.1)',
                        color: '#fbbf24',
                        border: '1px solid rgba(251, 191, 36, 0.15)',
                      }}
                    >
                      {achievement.category}
                    </span>
                  )}
                </div>

                {achievement.date && (
                  <p className="text-gray-500 text-xs mb-2">
                    {achievement.date}
                  </p>
                )}

                {achievement.description && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
