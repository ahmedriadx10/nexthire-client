import Link from "next/link";
import { 
  RiMapPinLine, 
  RiBriefcaseLine, 
  RiMoneyDollarCircleLine, 
  RiArrowRightLine,
  RiCodeSSlashLine
} from "react-icons/ri";

const opportunities = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives within modern tech stacks.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€130-140/hour",
    badge: "HOT",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    id: 2,
    title: "Senior UI Engineer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives within modern tech stacks.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€130-140/hour",
    badge: "HOT",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  {
    id: 3,
    title: "React specialist",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives within modern tech stacks.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€130-140/hour",
    badge: "HOT",
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  },
  {
    id: 4,
    title: "Frontend Lead",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives within modern tech stacks.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€130-140/hour",
    badge: "NEW",
    badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives within modern tech stacks.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€130-140/hour",
    badge: "HOT",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    id: 6,
    title: "Web Architect",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives within modern tech stacks.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€130-140/hour",
    badge: "NEW",
    badgeColor: "bg-pink-500/10 border-pink-500/30 text-pink-400",
  },
];

const FeaturedOpportunities = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-20">
      {/* Header section with heading and CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-primary uppercase select-none block mb-3">
            Smart Job Discovery
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Featured Opportunities
          </h2>
        </div>
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs md:text-sm font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-300 shadow-md group self-start sm:self-auto"
        >
          <span>View all job posts</span>
          <RiArrowRightLine className="text-base group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Grid of opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((job) => (
          <div
            key={job.id}
            className="flex flex-col justify-between bg-zinc-900/35 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/60 hover:bg-zinc-900/60 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_35px_-10px_rgba(0,166,251,0.08)] group"
          >
            {/* Top row: Icon and Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-center text-primary group-hover:text-white transition-colors duration-300">
                <RiCodeSSlashLine className="text-xl" />
              </div>
              <span className={`text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full border ${job.badgeColor} select-none`}>
                {job.badge}
              </span>
            </div>

            {/* Content: Title and description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {job.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                {job.description}
              </p>
            </div>

            {/* Divider line */}
            <div className="border-t border-zinc-900/80 mb-5" />

            {/* Footer row: info parameters and apply action */}
            <div>
              <div className="flex flex-col gap-2.5 mb-6 text-zinc-500 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <RiMapPinLine className="text-base text-zinc-650 group-hover:text-primary transition-colors duration-300" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiBriefcaseLine className="text-base text-zinc-650 group-hover:text-primary transition-colors duration-300" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiMoneyDollarCircleLine className="text-base text-zinc-650 group-hover:text-primary transition-colors duration-300" />
                  <span className="text-zinc-400 font-semibold">{job.salary}</span>
                </div>
              </div>

              <Link
                href={`/browse-jobs/${job.id}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-all duration-300"
              >
                <span>Apply Now</span>
                <RiArrowRightLine className="text-base group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedOpportunities;