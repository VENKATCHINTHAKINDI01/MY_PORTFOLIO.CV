import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Brain, Utensils, Shield, Play, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticWrapper } from '@/components/MagneticWrapper';

const projects = [
  {
    title: 'Text Summarization using NLP & Transformers',
    description: 'Advanced text summarization system leveraging NLP and transformer-based models to extract key insights from large volumes of text, applicable to news, legal, and academic domains.',
    tags: ['NLP', 'Transformers', 'Python', 'Deep Learning'],
    icon: Brain,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderGradient: 'from-cyan-500 to-blue-500',
    githubUrl: 'https://github.com/VENKATCHINTHAKINDI01/TEXT-SUMMARIZATION-USING-NLP-AND-TRANSFORMERS',
  },
  {
    title: 'Zomato Restaurant Recommendation System',
    description: 'End-to-end recommendation system using Word2Vec, ML, and Deep Learning. Implemented modular ML pipeline, tracked experiments with MLflow, deployed using FastAPI and Streamlit.',
    tags: ['Word2Vec', 'MLflow', 'FastAPI', 'Streamlit', 'DL'],
    icon: Utensils,
    gradient: 'from-orange-500/20 to-red-500/20',
    borderGradient: 'from-orange-500 to-red-500',
    githubUrl: 'https://github.com/VENKATCHINTHAKINDI01/ZOMATO_RESTRO_DL',
  },
  {
    title: 'End-to-End MLOps Network Security System',
    description: 'Complete ML lifecycle implementation with ETL pipelines, structured and NLP-based features, MLflow tracking, and production-grade deployment following robust MLOps practices.',
    tags: ['MLOps', 'ETL', 'FastAPI', 'MLflow', 'Security'],
    icon: Shield,
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderGradient: 'from-green-500 to-emerald-500',
    githubUrl: 'https://github.com/VENKATCHINTHAKINDI01/MLProject_01',
  },
  {
    title: 'Netflix Recommendation System',
    description: 'Content-based recommendation system using EDA, NLP, and clustering to analyze Netflix metadata and recommend similar shows and movies based on user preferences.',
    tags: ['EDA', 'NLP', 'Clustering', 'Python', 'Data Analysis'],
    icon: Play,
    gradient: 'from-red-500/20 to-pink-500/20',
    borderGradient: 'from-red-500 to-pink-500',
    githubUrl: 'https://github.com/VENKATCHINTHAKINDI01/Netflix-movies-and-shows-clustering-using-unsupervised-learning-and-a-movie-recommendation-system-',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 15,
      delay: i * 0.15,
    },
  }),
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute w-3 h-3 bg-primary/20 rounded-full blur-sm"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}
      
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
            <Folder className="w-4 h-4" />
            Portfolio
          </motion.div>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading mx-auto">
            Showcasing end-to-end ML solutions and data science applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <MagneticWrapper key={project.title} strength={0.15}>
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Gradient border on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className={`absolute -inset-0.5 bg-gradient-to-r ${project.borderGradient} rounded-xl blur-sm`}
                />
                
                <div className="glass-card relative overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                    
                    {/* Animated icon */}
                    <motion.div
                      animate={hoveredIndex === index ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <project.icon className="w-16 h-16 text-foreground/20" />
                    </motion.div>

                    {/* Shimmer effect */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={hoveredIndex === index ? { x: '200%' } : { x: '-100%' }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.h3
                      animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                      className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.3 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="skill-tag text-xs"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <MagneticWrapper strength={0.3} className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-border hover:border-primary/50 hover:bg-primary/10"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                      </MagneticWrapper>
                      <MagneticWrapper strength={0.4}>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </MagneticWrapper>
                    </div>
                  </div>
                </div>
              </motion.div>
            </MagneticWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
