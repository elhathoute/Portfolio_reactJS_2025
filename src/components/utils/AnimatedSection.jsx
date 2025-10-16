import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../constants/animations';
import { sectionStyles } from '../constants/styles';

/**
 * Reusable animated section wrapper
 * @param {Object} props - Component props
 * @param {string} props.id - Section ID
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Section content
 */
const AnimatedSection = ({ id, className = '', children }) => {
  return (
    <section id={id} className={`${sectionStyles.section} ${className}`}>
      <div className={sectionStyles.container}>
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={viewportOnce}
          transition={fadeInUp.transition}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedSection;
