import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticWrapper } from '@/components/MagneticWrapper';
import profilePhoto from '@/assets/profile-photo.jpg';

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // Create a sample resume download - in production, this would link to an actual PDF
    const link = document.createElement('a');
    link.href = '/public/CHINTHAKINDI_VENKAT_RESUME_01.pdf';
    link.download = 'Chinthakindi_Venkat_Resume.pdf';
    link.click();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/40 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + Math.random() * 50}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="relative mx-auto mb-8 w-36 h-36 sm:w-44 sm:h-44"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(187 85% 53%) 0%, hsl(199 89% 48%) 50%, hsl(217 91% 60%) 100%)',
                padding: '3px',
              }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </motion.div>
            <img
              src={profilePhoto}
              alt="Chinthakindi Venkat - AI/ML & Data Science Engineer"
              className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
            />
            {/* Status indicator */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-background"
            />
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Open to Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            Chinthakindi{' '}
            <span className="gradient-text">Venkat</span>
          </motion.h1>

          {/* Title with typing effect */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-6"
          >
            AI/ML & Data Science Engineer
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Driving innovation through Machine Learning, Data Science, and end-to-end MLOps solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <MagneticWrapper strength={0.4}>
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              >
                View Projects
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-border hover:bg-secondary/50 hover:border-primary/50 px-8"
              >
                Contact Me
              </Button>
            </MagneticWrapper>
            <MagneticWrapper strength={0.4}>
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownloadResume}
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8"
              >
                <Download className="mr-2 w-4 h-4" />
                Download CV
              </Button>
            </MagneticWrapper>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Github, href: 'https://github.com/VENKATCHINTHAKINDI01', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/venkat-chinthakindi-a08936251/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:venkatchinthakindi4@gmail.com', label: 'Email' },
            ].map((social, index) => (
              <MagneticWrapper key={social.label} strength={0.5}>
                <motion.a
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-3 rounded-full bg-secondary/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              </MagneticWrapper>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};
