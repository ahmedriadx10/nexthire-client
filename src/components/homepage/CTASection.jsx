import Link from "next/link";

const CTASection = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      {/* Curved glowing card container */}
      <div className="relative rounded-[32px] border border-zinc-800/80 overflow-hidden py-16 px-6 md:py-24 md:px-12 text-center bg-zinc-950/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,166,251,0.04)]">
        
        {/* CTA Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-color-dodge pointer-events-none"
          style={{ backgroundImage: `url('/images/cta-bg.png')` }}
        />
        
        {/* Inner Glowing Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-62.5 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Header Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] mb-4">
            Your next role is <br className="sm:hidden" />
            already{" "}
            <span className="italic font-serif text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-primary to-blue-400 font-normal pr-1">
              looking for you
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-100 hover:-translate-y-0.5 transition-all duration-300 shadow-lg text-sm sm:text-base"
            >
              Create a free account
            </Link>
            <Link
              href="/companies"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent border border-zinc-700 text-white font-bold hover:bg-zinc-900/55 hover:border-zinc-500 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
            >
              View company perks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
