'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaRobot, FaChartBar } from 'react-icons/fa';

const steps = [
  {
    icon: FaBriefcase,
    title: 'Company Posts a Job',
    description: 'Upload job details & requirements.',
  },
  {
    icon: FaRobot,
    title: 'AI Interviews Applicants',
    description: 'LLM, Speech, & Vision models evaluate responses.',
  },
  {
    icon: FaChartBar,
    title: 'Get Smart Insights',
    description: 'Receive structured evaluation reports & analytics.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform simplifies the interview process with AI-powered solutions
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={itemVariants}
            >
              <div className="backdrop-blur-sm bg-white/70 dark:bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}