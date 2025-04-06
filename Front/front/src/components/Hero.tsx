'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="className=py-16">
      {/* Background overlay for better text contrast */}
    
      {/* Content container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Revolutionize Hiring with AI-Powered Interviews!
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              AI Virtual Interviewer helps companies filter job applicants efficiently through smart NLP, speech, and facial analysis. Get objective, data-driven hiring insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
              >
                Get Started
              </a>
              <a
                href="/learn-more"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white/30 dark:bg-white/10 backdrop-blur-md hover:bg-white/40 dark:hover:bg-white/20 transition duration-150 ease-in-out"
              >
                Learn More
              </a>
            </div>
            
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="relative w-full max-w-2xl mx-auto -mt-8">
              <Image
                src="/images/Hero.png"
                alt="AI Virtual Interviewer"
                width={1000}
                height={1000}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
            
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;