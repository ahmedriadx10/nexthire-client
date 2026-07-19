import RegisterForm from "@/components/auth/RegisterFrom";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#000000] text-white font-sans overflow-x-hidden">
      {/* Left Column: Branding, Slogans, Stats */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-[53%] flex-col justify-between p-12 lg:p-16 bg-[#030303] border-r border-zinc-900/40 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/" className="text-xl font-bold tracking-tight text-primary transition-all hover:opacity-90">
            NextHire
          </Link>
        </div>

        {/* Middle: Headline */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <span className="text-[10px] lg:text-xs font-bold tracking-widest text-primary uppercase block mb-4">
            The Global Standard for Excellence
          </span>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Join the future of <br />
            <span className=" bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              talent discovery
            </span>.
          </h1>
          <p className="text-zinc-400 text-sm lg:text-base font-light leading-relaxed max-w-md">
            Connecting elite talent with world-class opportunities through a verified, high-performance ecosystem.
          </p>
        </div>

        {/* Bottom: Stats & Footer */}
        <div className="relative z-10 mt-auto">
          <div className="w-full border-t border-zinc-900 my-6"></div>
          <span className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase block mb-4">
            Trusted by Industry Leaders
          </span>
          <div className="flex gap-16 lg:gap-24">
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight">15k+</p>
              <p className="text-[10px] text-primary font-semibold tracking-wider uppercase mt-1">
                Elite Professionals
              </p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight">50k+</p>
              <p className="text-[10px] text-primary font-semibold tracking-wider uppercase mt-1">
                Global Opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Register Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 md:py-16 bg-[#000000]">
        {/* Mobile Header (Only visible on mobile screens) */}
        <div className="flex md:hidden justify-between items-center mb-8">
          <Link href="/" className="text-lg font-bold text-primary">
            NextHire
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-2">
              Start your journey with the elite tech community.
            </p>
          </div>

          {/* Form */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;