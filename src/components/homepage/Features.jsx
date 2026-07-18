import { 
  RiSearch2Line,
  RiWallet3Line, 
  RiBuilding4Line, 
  RiBookmarkLine, 
  RiCursorLine, 
  RiFileTextLine, 
  RiCpuLine, 
  RiLineChartLine 
} from "react-icons/ri";

const featuresList = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced semantic filters.",
    icon: RiSearch2Line,
    iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: RiWallet3Line,
    iconColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  {
    title: "Top Companies",
    description: "Apply to verified companies that are actively hiring.",
    icon: RiBuilding4Line,
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Saved Jobs",
    description: "Manage applications & favorites on your dashboard.",
    icon: RiBookmarkLine,
    iconColor: "text-zinc-300 bg-zinc-800/40 border-zinc-700/30",
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for a faster process.",
    icon: RiCursorLine,
    iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: RiFileTextLine,
    iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Skill-based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: RiCpuLine,
    iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "Career Growth",
    description: "Track your career path with expert guidance.",
    icon: RiLineChartLine,
    iconColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

const Features = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-87.5 h-87.5 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-87.5 h-87.5 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-primary uppercase select-none block mb-3">
          Features Set
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Everything you need to succeed
        </h2>
      </div>

      {/* Grid of features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featuresList.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div 
              key={idx}
              className="flex flex-col bg-zinc-950/30 border border-zinc-900 rounded-2xl p-6 hover:border-zinc-800/80 hover:bg-zinc-900/20 transition-all duration-300 group shadow-lg"
            >
              {/* Icon Container */}
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-105 ${feature.iconColor}`}>
                <Icon className="text-xl" />
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
