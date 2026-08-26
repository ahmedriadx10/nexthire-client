"use client";

import { FaRegCheckCircle } from "react-icons/fa";
import { FiCheckCircle, FiList, FiAward } from "react-icons/fi";

/**
 * Splits string by newlines or periods into clean bullet point items
 */
const parseBulletPoints = (text) => {
  if (!text) return [];
  // If text contains newlines, split by newline
  if (text.includes("\n")) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
  // Otherwise split by sentence period
  return text
    .split(/\.\s+/)
    .map((sentence) => sentence.trim().replace(/\.$/, ""))
    .filter((sentence) => sentence.length > 0);
};

export default function JobDetailsContent({ responsibilities, requirements }) {
  const respItems = parseBulletPoints(responsibilities);
  const reqItems = parseBulletPoints(requirements);

  return (
    <div className="space-y-8">
      {/* Responsibilities Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 text-emerald-400">
            <FiList className="text-xl" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Key Responsibilities
          </h2>
        </div>

        {respItems.length > 0 ? (
          <ul className="space-y-3.5">
            {respItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaRegCheckCircle className="text-emerald-400 text-base shrink-0 mt-1" />
                <span className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {item}
                  {!item.endsWith(".") && "."}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-400 text-sm italic">
            No specific responsibilities listed.
          </p>
        )}
      </div>

      {/* Requirements Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-900/60 text-emerald-400">
            <FiAward className="text-xl" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Requirements & Qualifications
          </h2>
        </div>

        {reqItems.length > 0 ? (
          <ul className="space-y-3.5">
            {reqItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaRegCheckCircle className="text-emerald-400 text-base shrink-0 mt-1" />
                <span className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {item}
                  {!item.endsWith(".") && "."}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-400 text-sm italic">
            No specific requirements listed.
          </p>
        )}
      </div>
    </div>
  );
}
