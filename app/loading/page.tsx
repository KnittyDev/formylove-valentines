"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LOADING_MESSAGES = [
  "Wiwi is eating a sandwich...",
  "Wiwi is reading Pibble lore",
  "Wiwi is choosing the perfect filter...",
  "Wiwi is thinking about you...",
  "Wiwi is brewing coffee...",
  "Wiwi is organizing the bookshelf...",
  "Wiwi is dancing to the beat...",
];

const HEART_COUNT = 12;

export default function LoadingPage() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/journey");
    }, 8000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center relative bg-[var(--background-dark)] text-white font-display">
      {/* Floating hearts layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: HEART_COUNT }, (_, i) => (
          <span
            key={i}
            className="absolute text-primary opacity-60 animate-[heart-float_4s_ease-in-out_infinite]"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${(i * 11) % 100}%`,
              fontSize: ["1rem", "1.25rem", "1.5rem", "1.75rem"][i % 4],
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
            aria-hidden
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background-dark)_70%)] pointer-events-none opacity-60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="flex gap-2 mb-8">
          <span className="text-3xl animate-[heartbeat_1.2s_ease-in-out_infinite]" aria-hidden>❤️</span>
          <span className="text-3xl animate-[heartbeat_1.2s_ease-in-out_0.2s_infinite]" aria-hidden>❤️</span>
          <span className="text-3xl animate-[heartbeat_1.2s_ease-in-out_0.4s_infinite]" aria-hidden>❤️</span>
        </div>

        <p
          key={messageIndex}
          className="font-display font-light text-white/90 text-lg md:text-xl max-w-md animate-[fadeIn_0.5s_ease-out]"
        >
          {LOADING_MESSAGES[messageIndex]}
        </p>

        <div className="mt-8 flex gap-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-[loading-dot_1.4s_ease-in-out_infinite]" />
          <span className="w-2 h-2 rounded-full bg-primary animate-[loading-dot_1.4s_ease-in-out_0.2s_infinite]" />
          <span className="w-2 h-2 rounded-full bg-primary animate-[loading-dot_1.4s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>
    </div>
  );
}
