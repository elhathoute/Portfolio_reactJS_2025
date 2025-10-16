import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../constants/animations';
import { sectionStyles } from '../constants/styles';

/**
 * Reusable section header component
 * @param {string} title - Section title
 * @param {string} subtitle - Section subtitle
 * @param {React.ReactNode} children - Additional content
 */
const SectionHeader = ({ title, subtitle, children }) => {
  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={viewportOnce}
      transition={fadeInUp.transition}
      className={sectionStyles.header}
    >
      <h2 className={sectionStyles.title}>
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className={sectionStyles.subtitle}
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
};

export default SectionHeader;
