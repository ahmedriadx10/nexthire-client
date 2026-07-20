"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUsers, FiShare2, FiGlobe } from "react-icons/fi";

const Footer = () => {
  const path = usePathname();
  // console.log("path console is here", path);

  if (path.startsWith("/dashboard")) return null;

  return (
    <footer className="w-full bg-[#030303] text-white border-t border-zinc-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 md:pb-16">
          {/* Logo and Tagline Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="text-3xl font-black tracking-tight text-primary select-none mb-4 hover:text-primary transition-colors duration-300"
            >
              NextHire
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6 font-light">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                aria-label="Community"
              >
                <FiUsers className="size-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                aria-label="Share"
              >
                <FiShare2 className="size-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900/80 border border-zinc-800/80 text-zinc-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                aria-label="Website"
              >
                <FiGlobe className="size-4" />
              </a>
            </div>
          </div>

          {/* Spacer Column for large layouts */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Product Links Column */}
          <div className="md:col-span-2 flex flex-col">
            <h3 className="text-primary font-bold tracking-wider text-xs uppercase mb-5 select-none">
              Product
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link
                  href="/browse-jobs"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Job discovery
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Worker AI
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigations Links Column */}
          <div className="md:col-span-2 flex flex-col">
            <h3 className="text-primary font-bold tracking-wider text-xs uppercase mb-5 select-none">
              Navigations
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Career library
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links Column */}
          <div className="md:col-span-2 flex flex-col">
            <h3 className="text-primary font-bold tracking-wider text-xs uppercase mb-5 select-none">
              Resources
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Brand Guideline
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-primary text-sm font-medium transition-colors duration-200 block"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-900/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-light">
          <p className="text-center md:text-left">
            &copy; 2024 NextHire. Empowering the next generation of tech talent.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms & Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
