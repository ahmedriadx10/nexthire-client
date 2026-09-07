"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const trendingRoles = [
  { name: "Frontend Developer", href: "/browse-jobs?role=frontend" },
  { name: "Backend Engineer", href: "/browse-jobs?role=backend" },
  { name: "React Specialist", href: "/browse-jobs?role=react" },
  { name: "UI/UX Designer", href: "/browse-jobs?role=ui-ux" },
  { name: "Full Stack Developer", href: "/browse-jobs?role=fullstack" },
  { name: "Data Scientist", href: "/browse-jobs?role=data-science" },
  { name: "DevOps Engineer", href: "/browse-jobs?role=devops" },
  { name: "Mobile Architect", href: "/browse-jobs?role=mobile" },
];

const stats = [
  { 
    value: "50K", 
    label: "ACTIVE JOBS", 
    color: "text-primary drop-shadow-[0_0_15px_rgba(0,166,251,0.3)]" 
  },
  { 
    value: "12K", 
    label: "COMPANIES", 
    color: "text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
  },
  { 
    value: "2M", 
    label: "JOB SEEKERS", 
    color: "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]" 
  },
  { 
    value: "97%", 
    label: "SATISFACTION RATE", 
    color: "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
  },
];

const rolesContainerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const roleItemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const QuickBrowse = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 pb-20 overflow-hidden">
      {/* Divider with Trending Roles Title */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-4 mb-8 w-full"
      >
        <div className="h-px flex-1 max-w-37.5 md:max-w-62.5 bg-linear-to-r from-transparent to-zinc-800" />
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase select-none">
          Quick browse trending roles
        </span>
        <div className="h-px flex-1 max-w-37.5 md:max-w-62.5 bg-linear-to-l from-transparent to-zinc-800" />
      </motion.div>

      {/* Trending Roles Links */}
      <motion.div 
        variants={rolesContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-16 relative z-10"
      >
        {trendingRoles.map((role, idx) => (
          <motion.div
            key={idx}
            variants={roleItemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={role.href}
              className="px-4 py-2 text-xs md:text-sm font-medium text-zinc-400 bg-zinc-900/30 border border-zinc-800/80 rounded-lg hover:text-white hover:border-zinc-700 hover:bg-zinc-800/30 transition-colors duration-300 shadow-md block"
            >
              {role.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Vault Stats Container with Arched Top */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl mx-auto rounded-t-[50px] md:rounded-t-[100px] border border-zinc-800/80 border-b-0 bg-linear-to-b from-zinc-900/40 to-black/10 backdrop-blur-xl p-8 pt-16 md:p-16 md:pt-24 overflow-hidden shadow-[0_-20px_50px_-20px_rgba(0,166,251,0.05)]"
      >
        {/* Globe Background Overlay */}
        <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-25 pointer-events-none mix-blend-lighten" />
        
        {/* Glow behind the stats */}
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-87.5 h-87.5 bg-primary/10 rounded-full blur-[100px] pointer-events-none" 
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-0 left-1/3 -translate-x-1/2 w-62.5 h-62.5 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" 
        />

        {/* Stats Grid */}
        <motion.div 
          variants={statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              variants={statItemVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-950/20 backdrop-blur-sm border border-zinc-900/50 hover:border-zinc-800/80 transition-colors duration-300 group"
            >
              <span className={`text-4xl md:text-5xl font-black tracking-tight mb-2 transition-transform duration-300 group-hover:scale-105 ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default QuickBrowse;