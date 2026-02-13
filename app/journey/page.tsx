"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NOISE_URL = "https://grainy-gradients.vercel.app/noise.svg";
const MUSIC_SRC = "/Under%20the%20Stars.mp3";

const IMAGES = ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg"];

const LONG_TEXTS: { greeting: string; heading: string; body: string }[] = [
  {
    greeting: "My dearest,",
    heading: "Every moment with you changed my life...",
    body: "Before you, the world was just colors in greyscale. Now, everything is vibrant. You are my quiet peace in a loud world, and my greatest adventure.",
  },
  {
    greeting: "My dearest,",
    heading: "Getting lost with you felt so right...",
    body: "Every street we walked became our own. Every corner held a secret we shared. You turned the city into our playground, and my heart into your home.",
  },
  {
    greeting: "My dearest,",
    heading: "The easiest Yes I ever said...",
    body: "You made me the happiest woman alive. With you I found not just love, but a place where I belong. You are my safe harbour and my greatest adventure.",
  },
  {
    greeting: "My dearest,",
    heading: "You said Yes!!! and bound our hearts forever...",
    body: "From that moment on, my heart is completely and forever bound to you. I can no longer imagine a world without you. You are my always.",
  },
  {
    greeting: "My dearest,",
    heading: "Every day with you is a new page I never want to end...",
    body: "You, me, and our future family—forever. Building our story together is the greatest gift. Thank you for being my forever.",
  },
  {
    greeting: "My dearest,",
    heading: "Moving out with you...",
    body: "Our first place together. Every box we unpack, every corner we make ours—this is the start of our home. I cannot wait to build this life with you.",
  },
];

function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function IconPlay({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconAddPhoto({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    </svg>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const revealEls = el.querySelectorAll(".reveal");
    revealEls.forEach((node) => observer.observe(node));
    return () => revealEls.forEach((node) => observer.unobserve(node));
  }, []);

  return ref;
}

export default function JourneyPage() {
  const mainRef = useReveal();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const [showDoYouLoveMe, setShowDoYouLoveMe] = useState(false);
  const hasStartedRef = useRef(false);

  const playMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      playMusic();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background-journey)] text-white font-display overflow-x-hidden selection:bg-primary selection:text-white">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" playsInline />

      {/* Long text modal */}
      {openModalId !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenModalId(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Letter"
        >
          <div
            className="relative w-full max-w-2xl min-h-[60vh] rounded-2xl bg-[var(--background-journey)] border border-white/10 shadow-2xl flex overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 px-8 sm:px-12 py-12 sm:py-16 flex flex-col justify-center text-left">
              <span className="font-serif text-6xl sm:text-7xl text-white/20 leading-none select-none" aria-hidden>
                &ldquo;
              </span>
              <p className="font-serif text-sm sm:text-base text-white/70 italic mt-2">{LONG_TEXTS[openModalId - 1].greeting}</p>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white/95 mt-4 leading-snug">
                {LONG_TEXTS[openModalId - 1].heading.split("...")[0]}
                <span className="italic">...</span>
              </h3>
              <p className="font-serif text-base sm:text-lg text-white/80 mt-6 leading-relaxed">
                {LONG_TEXTS[openModalId - 1].body}
              </p>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2" aria-hidden>
              <span className="w-2 h-2 rounded-full bg-white/90" />
              <span className="w-1.5 h-1.5 rounded-full border border-white/50" />
              <span className="w-1.5 h-1.5 rounded-full border border-white/50" />
            </div>
            <button
              type="button"
              onClick={() => setOpenModalId(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-gold/10 rounded-full blur-[120px] opacity-30" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url('${NOISE_URL}')` }}
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 glass-card px-4 sm:px-6 py-3 rounded-full">
          <Link href="/" className="flex items-center gap-2">
            <IconHeart className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold tracking-tight">The Journey</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a className="hover:text-primary transition-colors" href="#intro">
              Intro
            </a>
            <a className="text-white" href="#memories">
              Memories
            </a>
            <a className="hover:text-primary transition-colors" href="#future">
              Future
            </a>
          </div>
          <button
            type="button"
            onClick={toggleMusic}
            className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-transform active:scale-95 flex items-center gap-2"
          >
            <IconPlay className="w-4 h-4" />
            {isPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>
      </nav>

      {/* Main */}
      <main ref={mainRef} className="relative z-10 pt-28 sm:pt-32 pb-24">
        {/* Hero */}
        <header id="intro" className="text-center mb-20 sm:mb-24 relative px-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Our Love Story
          </div>
          <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-gold to-white/60 tracking-tight">
            Moments in Time
          </h1>
          <p className="reveal reveal-delay-2 text-white/60 max-w-lg mx-auto text-base sm:text-lg font-light leading-relaxed">
            Every second with you is a memory I want to keep forever. Here are the chapters of our beautiful story.
          </p>
          <div className="reveal reveal-delay-2 mt-8 flex justify-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40">
              {/* Orbiting hearts - outer ring */}
              <div className="play-me-orbit absolute inset-0 flex items-center justify-center" aria-hidden>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="absolute text-primary text-lg sm:text-xl opacity-90"
                    style={{
                      transform: `rotate(${i * 60}deg) translateY(-3.5rem)`,
                    }}
                  >
                    ❤️
                  </span>
                ))}
              </div>
              {/* Orbiting hearts - inner ring (reverse) */}
              <div className="play-me-orbit-slow absolute inset-4 sm:inset-6 flex items-center justify-center" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="absolute text-rose-gold/90 text-sm sm:text-base"
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-2rem)`,
                    }}
                  >
                    ❤️
                  </span>
                ))}
              </div>
              {/* Center button */}
              <button
                type="button"
                onClick={playMusic}
                className="play-me-glow play-me-scale relative z-10 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 border-2 border-primary text-white font-semibold text-sm tracking-widest uppercase transition-colors hover:scale-105 active:scale-95"
              >
                PLAY ME
              </button>
            </div>
          </div>
          <div className="reveal reveal-delay-3 mt-12 flex justify-center">
            <div className="w-px h-24 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse" />
          </div>
        </header>

        {/* Timeline */}
        <div id="memories" className="max-w-5xl mx-auto relative timeline-line px-2">
          {/* Section: How We Met */}
          <div className="relative z-10 flex justify-center mb-12 sm:mb-16">
            <div className="reveal glass-card px-6 sm:px-8 py-3 rounded-full border border-primary/30 shadow-[0_0_30px_rgba(255,77,109,0.2)]">
              <h2 className="text-xl sm:text-2xl font-semibold text-rose-gold text-center">
                How We Met
              </h2>
            </div>
          </div>

          {/* Memory 1 - Left card */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 px-2 md:px-0 group">
            <div className="w-full md:w-5/12 order-2 md:order-1 flex justify-end">
              <div className="reveal glass-card p-4 rounded-xl sm:rounded-lg -rotate-[2deg] hover:rotate-0 transition-[transform] duration-500 w-full max-w-md group-hover:border-primary/30">
                <div className="aspect-[4/3] w-full bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src={IMAGES[0]}
                    alt="Memory 1"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      In Pristina / Kosovo
                    </h3>
                    <p className="text-white/60 text-sm font-light">
                      Our first meeting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full bg-primary border-4 border-[var(--background-journey)] shadow-[0_0_15px_rgba(255,77,109,0.8)] z-20 order-1 md:order-2 mb-6 md:mb-0 shrink-0" />
            <div className="w-full md:w-5/12 order-3 pl-0 md:pl-8 text-center md:text-left">
              <p className="reveal text-lg sm:text-2xl font-light italic text-white/80 leading-relaxed">
                &ldquo;Our adventure that began in Pristina was the beginning of my life, and I told myself that having the goddess I would marry in my life was the best thing. Thankfully, even though she rejected me, our bodies and hearts met, my queen.&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setOpenModalId(1)}
                className="reveal mt-4 px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-sm font-medium transition-colors"
              >
                Click me
              </button>
            </div>
          </div>

          {/* Memory 2 - Right card */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 px-2 md:px-0 group">
            <div className="w-full md:w-5/12 order-3 md:order-1 pr-0 md:pr-8 text-center md:text-right">
              <p className="reveal text-lg sm:text-2xl font-light italic text-white/80 leading-relaxed">
                &ldquo;Getting lost in the city never felt so right. Every street was a new adventure.&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setOpenModalId(2)}
                className="reveal mt-4 px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-sm font-medium transition-colors"
              >
                Click me
              </button>
            </div>
            <div className="w-4 h-4 rounded-full bg-[var(--background-journey)] border-2 border-primary shadow-[0_0_10px_rgba(255,77,109,0.5)] z-20 order-1 md:order-2 mb-6 md:mb-0 shrink-0" />
            <div className="w-full md:w-5/12 order-2 md:order-3 flex justify-start">
              <div className="reveal glass-card p-4 rounded-xl sm:rounded-lg rotate-[2deg] hover:rotate-0 transition-[transform] duration-500 w-full max-w-md group-hover:border-primary/30">
                <div className="aspect-[4/5] w-full bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src={IMAGES[1]}
                    alt="Memory 2"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Montenegro / Budva</h3>
                    <p className="text-white/60 text-sm font-light">Our first vacation trip.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Our Best Memories */}
          <div className="relative z-10 flex justify-center mb-12 sm:mb-16">
            <div className="reveal glass-card px-6 sm:px-8 py-3 rounded-full border border-primary/30 shadow-[0_0_30px_rgba(255,77,109,0.2)] bg-[var(--background-journey)]/50">
              <h2 className="text-xl sm:text-2xl font-semibold text-rose-gold text-center">
                Our Best Memories
              </h2>
            </div>
          </div>

          {/* Memory 3 - Left card */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 px-2 md:px-0 group">
            <div className="w-full md:w-5/12 order-2 md:order-1 flex justify-end">
              <div className="reveal glass-card p-4 rounded-xl sm:rounded-lg -rotate-[1deg] hover:rotate-0 transition-[transform] duration-500 w-full max-w-md group-hover:border-primary/30">
                <div className="aspect-square w-full bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src={IMAGES[2]}
                    alt="Memory 3"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <IconHeart className="text-primary w-8 h-8 drop-shadow-lg" />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">I felt at home because you are my home</h3>
                    <p className="text-white/60 text-sm font-light">Felt at home.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-primary border-4 border-[var(--background-journey)] shadow-[0_0_20px_rgba(255,77,109,0.8)] z-20 order-1 md:order-2 mb-6 md:mb-0 shrink-0 ring-4 ring-primary/20" />
            <div className="w-full md:w-5/12 order-3 pl-0 md:pl-8 text-center md:text-left">
              <p className="reveal text-lg sm:text-2xl font-light italic text-white/80 leading-relaxed">
                &ldquo;The easiest &lsquo;Yes&rsquo; I ever said. You made me the happiest woman alive.&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setOpenModalId(3)}
                className="reveal mt-4 px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-sm font-medium transition-colors"
              >
                Click me
              </button>
            </div>
          </div>

          {/* Memory 4 - Right card */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 px-2 md:px-0 group">
            <div className="w-full md:w-5/12 order-3 md:order-1 pr-0 md:pr-8 text-center md:text-right">
              <p className="reveal text-lg sm:text-2xl font-light italic text-white/80 leading-relaxed">
                &ldquo;You said &lsquo;Yes!!!&rsquo; to my proposal, and from now on, my heart is completely and forever bound to you; I can no longer live without you..&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setOpenModalId(4)}
                className="reveal mt-4 px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-sm font-medium transition-colors"
              >
                Click me
              </button>
            </div>
            <div className="w-4 h-4 rounded-full bg-[var(--background-journey)] border-2 border-primary shadow-[0_0_10px_rgba(255,77,109,0.5)] z-20 order-1 md:order-2 mb-6 md:mb-0 shrink-0" />
            <div className="w-full md:w-5/12 order-2 md:order-3 flex justify-start">
              <div className="reveal glass-card p-4 rounded-xl sm:rounded-lg rotate-[2deg] hover:rotate-0 transition-[transform] duration-500 w-full max-w-md group-hover:border-primary/30">
                <div className="aspect-[4/3] w-full bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src="/saidyes.jpeg"
                    alt="Romantic dinner, our moment of truth"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">You said YES!!!</h3>
                    <p className="text-white/60 text-sm font-light">Our moment of truth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Forever Yours */}
          <div className="relative z-10 flex justify-center mb-12 sm:mb-16">
            <div className="reveal glass-card px-6 sm:px-8 py-3 rounded-full border border-primary/30 shadow-[0_0_30px_rgba(255,77,109,0.2)] bg-[var(--background-journey)]/50">
              <h2 className="text-xl sm:text-2xl font-semibold text-rose-gold text-center">
                Forever Yours
              </h2>
            </div>
          </div>

        
          {/* Memory 5 - Left card */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 px-2 md:px-0 group">
            <div className="w-full md:w-5/12 order-2 md:order-1 flex justify-end">
              <div className="reveal glass-card p-4 rounded-xl sm:rounded-lg -rotate-[2deg] hover:rotate-0 transition-[transform] duration-500 w-full max-w-md group-hover:border-primary/30">
                <div className="aspect-[4/3] w-full bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src={IMAGES[4]}
                    alt="Memory 5"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Another Chapter</h3>
                    <p className="text-white/60 text-sm font-light">Our story keeps growing.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full bg-primary border-4 border-[var(--background-journey)] shadow-[0_0_15px_rgba(255,77,109,0.8)] z-20 order-1 md:order-2 mb-6 md:mb-0 shrink-0" />
            <div className="w-full md:w-5/12 order-3 pl-0 md:pl-8 text-center md:text-left">
              <p className="reveal text-lg sm:text-2xl font-light italic text-white/80 leading-relaxed">
                &ldquo;Every day with you is a new page I never want to end. You, me and future family to forever!&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setOpenModalId(5)}
                className="reveal mt-4 px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-sm font-medium transition-colors"
              >
                Click me
              </button>
            </div>
          </div>

          {/* Section: Moving out with you */}
          <div className="relative z-10 flex justify-center mb-12 sm:mb-16">
            <div className="reveal glass-card px-6 sm:px-8 py-3 rounded-full border border-primary/30 shadow-[0_0_30px_rgba(255,77,109,0.2)] bg-[var(--background-journey)]/50">
              <h2 className="text-xl sm:text-2xl font-semibold text-rose-gold text-center">
                Moving out with you
              </h2>
            </div>
          </div>

          {/* Memory 6 - Left card (Moving out with you) */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-16 sm:mb-24 px-2 md:px-0 group">
            <div className="w-full md:w-5/12 order-2 md:order-1 flex justify-end">
              <div className="reveal glass-card p-4 rounded-xl sm:rounded-lg -rotate-[2deg] hover:rotate-0 transition-[transform] duration-500 w-full max-w-md group-hover:border-primary/30">
                <div className="aspect-[4/3] w-full bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
                  <img
                    src="/living-with-9.webp"
                    alt="Moving out with you"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Our first place</h3>
                    <p className="text-white/60 text-sm font-light">Building our home together.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full bg-primary border-4 border-[var(--background-journey)] shadow-[0_0_15px_rgba(255,77,109,0.8)] z-20 order-1 md:order-2 mb-6 md:mb-0 shrink-0" />
            <div className="w-full md:w-5/12 order-3 pl-0 md:pl-8 text-center md:text-left">
              <p className="reveal text-lg sm:text-2xl font-light italic text-white/80 leading-relaxed">
                &ldquo;Every box we unpack, every corner we make ours—this is the start of our home. I cannot wait to build this life with you.&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setOpenModalId(6)}
                className="reveal mt-4 px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-sm font-medium transition-colors"
              >
                Click me
              </button>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <footer id="future" className="text-center mt-12 mb-20 relative z-10 px-4">
          <h2 className="reveal text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            And the story continues...
          </h2>
          <div className="reveal reveal-delay-1 flex flex-col items-center gap-6">
            <button
              type="button"
              className="bg-primary hover:bg-primary/90 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium shadow-[0_0_20px_rgba(255,77,109,0.4)] hover:shadow-[0_0_30px_rgba(255,77,109,0.6)] transition-all flex items-center justify-center gap-2 animate-[heartbeat_2s_ease-in-out_infinite]"
            >
              <IconHeart className="w-5 h-5" />
              I love you with all my heart and soul!
            </button>
            <div className="w-full max-w-md">
              <div className="glass-card rounded-2xl border border-primary/30 px-6 py-6 sm:px-8 sm:py-8 text-center shadow-[0_0_40px_rgba(255,77,109,0.15)]">
                <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-4">A question for you</p>
                <button
                  type="button"
                  onClick={() => setShowDoYouLoveMe(true)}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary/20 to-rose-gold/20 hover:from-primary/30 hover:to-rose-gold/30 border-2 border-primary/50 text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="text-xl" aria-hidden>💕</span>
                  Do you love me?
                </button>
                {showDoYouLoveMe && (
                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-4 animate-[fadeIn_0.5s_ease-out]">
                    <Link
                      href="/forever"
                      className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_25px_rgba(255,77,109,0.5)] hover:shadow-[0_0_35px_rgba(255,77,109,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <IconHeart className="w-5 h-5" />
                      Yes yes
                    </Link>
                    <Link
                      href="/forever"
                      className="px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_25px_rgba(255,77,109,0.5)] hover:shadow-[0_0_35px_rgba(255,77,109,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <IconHeart className="w-5 h-5" />
                      Yes yes
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="reveal reveal-delay-2 mt-12 text-white/30 text-sm">
            Made with love for my forever Valentine.
          </p>
        </footer>
      </main>

      {/* FAB */}
      <button
        type="button"
        aria-label="Love"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-primary hover:bg-primary/90 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-[0_4px_20px_rgba(255,77,109,0.5)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:animate-ping">
          <IconHeart className="w-6 h-6 sm:w-7 sm:h-7" />
        </span>
        <IconHeart className="w-6 h-6 sm:w-7 sm:h-7 relative" />
      </button>
    </div>
  );
}
