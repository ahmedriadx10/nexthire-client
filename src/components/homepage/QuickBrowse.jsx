import Link from "next/link";

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

const QuickBrowse = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 pb-20 overflow-hidden">
      {/* Divider with Trending Roles Title */}
      <div className="flex items-center justify-center gap-4 mb-8 w-full">
        <div className="h-px flex-1 max-w-37.5 md:max-w-62.5 bg-linear-to-r from-transparent to-zinc-800" />
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase select-none">
          Quick browse trending roles
        </span>
        <div className="h-px flex-1 max-w-37.5 md:max-w-62.5 bg-linear-to-l from-transparent to-zinc-800" />
      </div>

      {/* Trending Roles Links */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-16 relative z-10">
        {trendingRoles.map((role, idx) => (
          <Link
            key={idx}
            href={role.href}
            className="px-4 py-2 text-xs md:text-sm font-medium text-zinc-400 bg-zinc-900/30 border border-zinc-800/80 rounded-lg hover:text-white hover:border-zinc-700 hover:bg-zinc-800/30 hover:scale-[1.03] transition-all duration-300 shadow-md"
          >
            {role.name}
          </Link>
        ))}
      </div>

      {/* Vault Stats Container with Arched Top */}
      <div className="relative w-full max-w-5xl mx-auto rounded-t-[50px] md:rounded-t-[100px] border border-zinc-800/80 border-b-0 bg-linear-to-b from-zinc-900/40 to-black/10 backdrop-blur-xl p-8 pt-16 md:p-16 md:pt-24 overflow-hidden shadow-[0_-20px_50px_-20px_rgba(0,166,251,0.05)]">
        {/* Globe Background Overlay */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-25 pointer-events-none mix-blend-lighten"
    
        />
        
        {/* Glow behind the stats */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-87.5 h-87.5 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 left-1/3 -translate-x-1/2 w-62.5 h-62.5 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-950/20 backdrop-blur-sm border border-zinc-900/50 hover:border-zinc-800/80 transition-all duration-300 group"
            >
              <span className={`text-4xl md:text-5xl font-black tracking-tight mb-2 transition-transform duration-300 group-hover:scale-105 ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickBrowse;