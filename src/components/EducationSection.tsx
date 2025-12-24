import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech – Computer Science',
    institution: 'Sathyabama Institute of Science and Technology',
    location: 'Chennai',
    period: '2021 – 2025',
    score: 'CGPA: 8.3',
    highlights: ['Machine Learning', 'Data Science', 'NLP', 'Artificial Intelligence'],
  },
  {
    degree: 'Intermediate (12th)',
    institution: 'Sri Chaitanya Junior Kalasala',
    location: 'Hyderabad',
    period: '2019 – 2021',
    score: 'Percentage: 87.2%',
    highlights: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    degree: 'SSC (10th)',
    institution: 'Krishnaveni High School',
    location: 'Mancherial',
    period: '2019',
    score: 'GPA: 9.7',
    highlights: ['Academic Excellence'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -50, rotateY: -10 },
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

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);

  return (
    <section id="education" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 w-20 h-20 border border-primary/20 rounded-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-40 left-10 w-16 h-16 border border-primary/10 rounded-full"
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
            <GraduationCap className="w-4 h-4" />
            Education
          </motion.div>
          <h2 className="section-heading">
            Academic <span className="gradient-text">Background</span>
          </h2>
          <p className="section-subheading mx-auto">
            Building a strong foundation in Computer Science
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Animated timeline line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] top-6 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent origin-top"
          />

          {education.map((item, index) => (
            <motion.div
              key={item.degree}
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
                className="absolute left-0 top-1 timeline-dot"
              />

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card-hover p-6 ml-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + 0.4 }}
                      className="flex items-center gap-2 text-primary text-sm font-medium mb-2"
                    >
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </motion.div>
                    <h3 className="text-xl font-semibold">{item.degree}</h3>
                    <p className="text-muted-foreground">{item.institution}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20"
                  >
                    <Award className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">{item.score}</span>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight, hIndex) => (
                    <motion.span
                      key={highlight}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5 + hIndex * 0.05 }}
                      whileHover={{ scale: 1.1 }}
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
