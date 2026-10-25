"use client";

import { useState } from "react";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60"
      >
        <span>{title}</span>
        <span className="text-sm text-slate-500">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-800">
          {children}
        </div>
      )}
    </div>
  );
}
