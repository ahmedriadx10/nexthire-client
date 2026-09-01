"use client";

import { useState } from "react";
import { FiPlus, FiX, FiCheckCircle } from "react-icons/fi";

/**
 * SeekerSkillsInput
 * Interactive tag/chip manager for seeker skills (string[]).
 * Supports adding via Enter/comma and removing tags.
 */
export default function SeekerSkillsInput({ skills = [], onChange }) {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skillToAdd) => {
    const trimmed = skillToAdd.trim().replace(/^,+|,+$/g, "");
    if (!trimmed) return;

    // Avoid exact duplicate skills (case-insensitive check)
    const exists = skills.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );
    if (!exists) {
      onChange([...skills, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  const handleRemove = (indexToRemove) => {
    onChange(skills.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Input row */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Next.js, Node.js, Python (Press Enter or comma)"
          className="flex-1 h-10 px-3 rounded-lg bg-[#141416]/90 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all text-sm font-light"
        />
        <button
          type="button"
          onClick={() => addSkill(inputValue)}
          disabled={!inputValue.trim()}
          className="h-10 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          <FiPlus className="text-sm stroke-[2.5]" />
          Add Skill
        </button>
      </div>

      {/* Chips list */}
      {skills.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {skills.map((skill, idx) => (
            <span
              key={`${skill}-${idx}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full transition-all group"
            >
              <FiCheckCircle className="text-[11px] text-emerald-400 shrink-0" />
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-emerald-500/70 hover:text-red-400 p-0.5 rounded-full hover:bg-red-500/10 transition-colors cursor-pointer"
                title={`Remove ${skill}`}
                aria-label={`Remove ${skill}`}
              >
                <FiX className="text-xs" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-zinc-600 font-light italic">
          No skills added yet. Type a skill above and press Enter or click Add.
        </p>
      )}
    </div>
  );
}
