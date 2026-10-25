"use client";

import { useState, useEffect } from "react";

export default function LikeButton({ slug }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const isLiked = localStorage.getItem(`like_${slug}`) === "true";
    const savedCount = parseInt(localStorage.getItem(`count_${slug}`) || "0", 10);
    setTimeout(() => {
      setLiked(isLiked);
      setCount(savedCount);
    }, 0);
  }, [slug]);

  function handleLike() {
    const nextState = !liked;
    const nextCount = nextState ? count + 1 : Math.max(0, count - 1);
    setLiked(nextState);
    setCount(nextCount);
    localStorage.setItem(`like_${slug}`, String(nextState));
    localStorage.setItem(`count_${slug}`, String(nextCount));
  }

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        liked
          ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
          : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      <span>{liked ? "❤️ Liked" : "🤍 Like"}</span>
      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-800 dark:bg-slate-700 dark:text-slate-200">
        {count}
      </span>
    </button>
  );
}
