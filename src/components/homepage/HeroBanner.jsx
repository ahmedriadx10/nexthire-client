"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  RiCpuLine, 
  RiCodeSSlashLine, 
  RiPaletteLine, 
  RiInboxArchiveLine, 
  RiMegaphoneLine
} from "react-icons/ri";

const categories = [
  { 
    name: "AI & Machine Learning", 
    icon: RiCpuLine, 
    href: "/browse-jobs?category=ai-ml",
    color: "text-purple-400 hover:bg-purple-500/5 hover:border-purple-500/30" 
  },
  { 
    name: "Engineering", 
    icon: RiCodeSSlashLine, 
    href: "/browse-jobs?category=engineering",
    color: "text-blue-400 hover:bg-blue-500/5 hover:border-blue-500/30" 
  },
  { 
    name: "Design", 
    icon: RiPaletteLine, 
    href: "/browse-jobs?category=design",
    color: "text-pink-400 hover:bg-pink-500/5 hover:border-pink-500/30" 
  },
  { 
    name: "Product", 
    icon: RiInboxArchiveLine, 
    href: "/browse-jobs?category=product",
    color: "text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/30" 
  },
  { 
    name: "Marketing", 
    icon: RiMegaphoneLine, 
    href: "/browse-jobs?category=marketing",
    color: "text-amber-400 hover:bg-amber-500/5 hover:border-amber-500/30" 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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

const HeroBanner = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-24 pb-16 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Dynamic spots of lights (glowing gradients) */}
      <motion.div 
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-primary/10 rounded-full blur-[130px] pointer-events-none" 
      />
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-25 left-1/2 -translate-x-1/2 w-200 h-62.5 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center max-w-4xl"
      >
        {/* Pulsing Pill */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-[11px] md:text-xs text-zinc-400 font-medium mb-8 backdrop-blur-md select-none shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">50,000+ NEW JOBS THIS MONTH</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.15] md:leading-[1.1] select-none">
          The roles you'd{" "}
          <span className="italic font-serif text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-primary to-blue-400 font-normal pr-1">
            never
          </span>{" "}
          find <br />
          by searching
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Assisting over 15,000 job seekers find their dream positions with our AI-driven discovery engine.
        </motion.p>

        {/* Categories Row */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto mb-16 relative z-10">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={category.href}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900/40 border border-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-850/50 transition-colors duration-300 text-xs sm:text-sm font-medium shadow-lg hover:shadow-primary/5 ${category.color}`}
                >
                  <Icon className="text-lg shrink-0" />
                  <span>{category.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;