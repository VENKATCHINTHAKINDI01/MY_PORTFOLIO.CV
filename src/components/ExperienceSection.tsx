import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, Building2, Rocket } from 'lucide-react';

const experiences = [
  {
    title: 'Graduate Engineer Trainee',
    company: 'HCLTech',
    period: 'Sep 2025 – Present',
    description: 'Working on enterprise-level machine learning solutions and production deployments.',
    highlights: [
      'End-to-end ML pipeline development',
      'Production-grade model deployment',
      'Cross-functional collaboration',
    ],
    current: true,
  },
  {
    title: 'Academic Trainee',
    company: 'HCLTech',
    period: 'Mar 2025 – Sep 2025',
    description: 'Intensive training program focusing on industry-standard ML practices and tools.',
    highlights: [
      'Advanced ML/DL frameworks',
      'MLOps best practices',
      'Real-world project exposure',
    ],
    current: false,
  },
  {
    title: 'Project Intern',
    company: 'HCLTech',
    period: 'Jul 2023 – Oct 2023',
    description: 'Hands-on experience with machine learning workflows in an enterprise environment.',
    highlights: [
      'Data preprocessing pipelines',
      'Model training & evaluation',
      'Technical documentation',
    ],
    current: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: 50, rotateY: 10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 15,
      delay: i * 0.2,
    },
  }),
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '100%']);

  return (
    <section id="experience" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-40 right-10 w-40 h-40 border-2 border-dashed border-primary/10 rounded-full"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-20 w-20 h-20 bg-primary/5 rounded-lg"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          >
            <Rocket className="w-4 h-4" />
            Experience
          </motion.div>
          <h2 className="section-heading">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subheading mx-auto">
            Building expertise through industry exposure at HCLTech
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Animated timeline line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] top-6 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent origin-top"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.period}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                className={`absolute left-0 top-1 timeline-dot ${exp.current ? '' : ''}`}
              >
                {exp.current && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
              </motion.div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`glass-card-hover p-6 ml-4 ${exp.current ? 'border-primary/30 shadow-[0_0_30px_hsl(187_85%_53%_/_0.1)]' : ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {exp.current && (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full"
                        >
                          Current
                        </motion.span>
                      )}
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-primary"
                    >
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 rounded-xl bg-primary/10"
                  >
                    <Briefcase className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <motion.span
                      key={highlight}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5 + hIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="skill-tag text-xs cursor-default"
                    >
                      {highlight}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
