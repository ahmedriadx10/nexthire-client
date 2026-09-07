"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const CTASection = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      {/* Curved glowing card container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[32px] border border-zinc-800/80 overflow-hidden py-16 px-6 md:py-24 md:px-12 text-center bg-zinc-950/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,166,251,0.04)]"
      >
        {/* CTA Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-color-dodge pointer-events-none"
          style={{ backgroundImage: `url('/images/cta-bg.png')` }}
        />
        
        {/* Inner Glowing Gradient */}
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-primary/10 rounded-full blur-[100px] pointer-events-none" 
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-62.5 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" 
        />

        {/* Content Box */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          {/* Header Title */}
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] mb-4">
            Your next role is <br className="sm:hidden" />
            already{" "}
            <span className="italic font-serif text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-primary to-blue-400 font-normal pr-1">
              looking for you
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </motion.p>

          {/* Interactive Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/pricing"
                className="block w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-100 transition-colors duration-300 shadow-lg text-sm sm:text-base"
              >
                Create a free account
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/companies"
                className="block w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent border border-zinc-700 text-white font-bold hover:bg-zinc-900/55 hover:border-zinc-500 transition-colors duration-300 text-sm sm:text-base"
              >
                View company perks
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
