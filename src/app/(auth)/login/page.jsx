import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#000000] text-white font-sans overflow-x-hidden">
      {/* Left Column: Branding, Slogans, Stats Cards */}
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
          <h1 className="text-3xl lg:text-5xl  font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Welcome back to the <br />
            <span className=" bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              future
            </span>{" "}
            of talent <br />
            discovery.
          </h1>
          <p className="text-zinc-400 text-sm lg:text-base font-light leading-relaxed max-w-md">
            Experience the precision of technical recruitment optimized by our proprietary neural matchmaking engine.
          </p>
        </div>

        {/* Bottom: Stats Cards */}
        <div className="relative z-10 mt-auto">
          <div className="flex gap-4 w-full max-w-md">
            {/* Card 1: Network Size */}
            <div className="bg-[#141416]/50 border border-zinc-900 rounded-xl p-5 flex-1 hover:border-zinc-800 transition-all duration-300">
              <span className="text-[9px] font-bold text-primary tracking-widest uppercase block mb-2">
                Network Size
              </span>
              <p className="text-2xl font-bold text-white tracking-tight">15k+</p>
              <p className="text-[10px] text-zinc-500 font-light mt-1">
                Elite Professionals
              </p>
            </div>

            {/* Card 2: Momentum */}
            <div className="bg-[#141416]/50 border border-zinc-900 rounded-xl p-5 flex-1 hover:border-zinc-800 transition-all duration-300">
              <span className="text-[9px] font-bold text-primary tracking-widest uppercase block mb-2">
                Momentum
              </span>
              <p className="text-2xl font-bold text-white tracking-tight">+124%</p>
              <p className="text-[10px] text-zinc-500 font-light mt-1">
                Network Growth
              </p>
            </div>
          </div>

          {/* Slogan Dots */}
          <div className="text-zinc-800 text-xl tracking-widest mt-8 font-mono select-none">
            ...
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
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
              Sign In
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;