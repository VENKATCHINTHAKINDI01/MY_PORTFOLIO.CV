import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Target, Lightbulb, Users, TrendingUp, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: Target,
    title: 'Goal-Oriented',
    description: 'Focused on delivering impactful ML solutions',
  },
  {
    icon: Lightbulb,
    title: 'Innovative',
    description: 'Passionate about cutting-edge technologies',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'Thriving in team environments',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Learner',
    description: 'Always expanding technical expertise',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
      />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />
      
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
            <Sparkles className="w-4 h-4" />
            About Me
          </motion.div>
          <h2 className="section-heading">
            Passionate <span className="gradient-text">Developer</span>
          </h2>
          <p className="section-subheading mx-auto">
            Transforming data into actionable insights and intelligent solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="glass-card p-6 md:p-8 group hover:border-primary/30 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Career Objective
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seeking a challenging role in a dynamic, fast-paced environment to leverage analytical thinking, 
                  continuous learning, and technical expertise to deliver impactful Machine Learning and Data Science solutions. 
                  Committed to innovation and excellence in every project.
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-6 md:p-8 group hover:border-primary/30 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  My Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  As a Computer Science graduate from Sathyabama Institute of Science and Technology, I've developed 
                  a strong foundation in Machine Learning, Natural Language Processing, and MLOps. My experience at HCLTech 
                  has equipped me with practical skills in enterprise-level ML workflows, from data preprocessing to 
                  production deployment.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: 'spring', stiffness: 400 }
                }}
                className="glass-card-hover p-6 text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
