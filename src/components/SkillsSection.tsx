import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Database, Award, Zap } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 75 },
      { name: 'C', level: 70 },
    ],
  },
  {
    title: 'Data Science & ML',
    icon: Brain,
    skills: [
      { name: 'TensorFlow & SK-Learn', level: 85 },
      { name: 'Pandas & NumPy', level: 90 },
      { name: 'NLP & Transformers', level: 80 },
      { name: 'OpenCV', level: 70 },
      { name: 'Plotly', level: 85 },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'SQL', level: 80 },
    ],
  },
];

const certifications = [
  {
    name: 'PCAP: Programming Essentials in Python',
    issuer: 'Cisco NETACAD',
  },
  {
    name: 'Python Certification',
    issuer: 'HCLTech',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-primary/10"
      />
      
      {/* Floating decorations */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-20 w-24 h-24 bg-primary/5 rounded-2xl"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <Zap className="w-4 h-4" />
            Skills & Expertise
          </motion.div>
          <h2 className="section-heading">
            Technical <span className="gradient-text">Proficiency</span>
          </h2>
          <p className="section-subheading mx-auto">
            Expertise built through hands-on projects and industry experience
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-6 group"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: categoryIndex * 0.1 + 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <category.icon className="w-5 h-5" />
                </motion.div>
                <h3 className="font-semibold">{category.title}</h3>
              </motion.div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{skill.name}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.5 }}
                        className="text-muted-foreground"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={isInView ? { width: `${skill.level}%`, opacity: 1 } : {}}
                        transition={{ 
                          duration: 1.2, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="h-full rounded-full relative"
                        style={{
                          background: 'linear-gradient(90deg, hsl(187 85% 53%) 0%, hsl(199 89% 48%) 50%, hsl(217 91% 60%) 100%)',
                        }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 + skillIndex * 0.2 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Certifications
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: '0 20px 40px hsl(187 85% 53% / 0.2)'
                }}
                className="glass-card-hover p-5 text-center cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Award className="w-6 h-6 text-primary" />
                </motion.div>
                <h4 className="font-medium mb-1">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
