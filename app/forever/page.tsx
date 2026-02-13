"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const MUSIC_SRC = "/Under%20the%20Stars.mp3";

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function IconMusic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

export default function ForeverPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background-journey)] text-white font-display overflow-hidden relative flex flex-col items-center justify-center selection:bg-primary selection:text-white">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" playsInline className="hidden" />

      {/* Music toggle - top right */}
      <div className="absolute top-8 right-8 z-50">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="group flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
        >
          <IconMusic className="w-6 h-6 text-white/80 group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[150px] mix-blend-screen" />
        <div className="forever-particle w-4 h-4 top-[20%] left-[15%] animate-float-proposal opacity-60" />
        <div className="forever-particle w-8 h-8 top-[60%] left-[80%] animate-float-proposal-delayed opacity-40" />
        <div className="forever-particle w-3 h-3 top-[80%] left-[20%] animate-float-proposal opacity-50" />
        <div className="forever-particle w-6 h-6 top-[10%] left-[60%] animate-float-proposal-delayed opacity-30" />
        <div className="forever-particle w-2 h-2 top-[40%] right-[30%] animate-float-proposal opacity-70" />
        <IconHeart className="absolute w-12 h-12 text-primary top-[15%] left-[10%] animate-float-proposal opacity-20" />
        <IconHeart className="absolute w-8 h-8 text-primary top-[75%] right-[15%] animate-float-proposal-delayed opacity-15" />
        <IconHeart className="absolute w-6 h-6 text-primary bottom-[20%] left-[25%] animate-float-proposal opacity-10" />
      </div>

      {/* Main */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-[80vh] gap-12 lg:gap-20">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-[1.1] text-white drop-shadow-2xl opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]">
          Will you keep <br className="hidden md:block" />
          <span className="text-white/90">making memories</span> <br className="hidden md:block" />
          with me forever?
        </h1>

        <div className="relative group opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards]">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-[40px] group-hover:blur-[60px] transition-all duration-700 animate-pulse-slow" />
          <a
            href="https://www.youtube.com/watch?v=pCkYhjNCuMM"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none transform transition-transform duration-300 hover:scale-105 active:scale-95 animate-heartbeat-proposal cursor-pointer block"
          >
            <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            <svg
              className="w-full h-full text-primary drop-shadow-[0_0_15px_rgba(255,77,109,0.8)] overflow-visible"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="absolute text-white font-serif font-bold text-2xl md:text-3xl tracking-widest uppercase drop-shadow-md">
              Yes
            </span>
          </a>
          <p className="mt-8 text-white/50 text-sm tracking-widest uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
            Click to say yes
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-12 w-full text-center z-20 opacity-0 animate-[fadeIn_1.5s_ease-out_1s_forwards]">
        <div className="inline-flex items-center justify-center px-8 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
          <span className="text-rose-gold-gradient text-lg md:text-xl font-medium tracking-wide font-display">
            Happy Valentine&apos;s Day, my love ❤️
          </span>
        </div>
        <Link
          href="/journey"
          className="mt-4 inline-block text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          ← Back to journey
        </Link>
      </footer>
    </div>
  );
}
