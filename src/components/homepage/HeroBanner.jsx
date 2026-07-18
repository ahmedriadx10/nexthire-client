import Link from "next/link";
import { 
  RiCpuLine, 
  RiCodeSSlashLine, 
  RiPaletteLine, 
  RiInboxArchiveLine, 
  RiMegaphoneLine,
  RiSparklingLine
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

const HeroBanner = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center pt-24 pb-16 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Dynamic spots of lights (glowing gradients) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -top-25 left-1/2 -translate-x-1/2 w-200 h-62.5 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Pulsing Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-[11px] md:text-xs text-zinc-400 font-medium mb-8 backdrop-blur-md select-none animate-fade-in shadow-inner">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="tracking-wide">50,000+ NEW JOBS THIS MONTH</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-[1.15] md:leading-[1.1] select-none">
        The roles you'd{" "}
        <span className="italic font-serif text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-primary to-blue-400 font-normal pr-1">
          never
        </span>{" "}
        find <br />
        by searching
      </h1>

      {/* Subheading */}
      <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
        Assisting over 15,000 job seekers find their dream positions with our AI-driven discovery engine.
      </p>

      {/* Categories Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto mb-16 relative z-10">
        {categories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <Link
              key={idx}
              href={category.href}
              className={`flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900/40 border border-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-850/50 hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm font-medium shadow-lg hover:shadow-primary/5 ${category.color}`}
            >
              <Icon className="text-lg shrink-0" />
              <span>{category.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HeroBanner;