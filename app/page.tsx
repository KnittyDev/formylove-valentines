import Link from "next/link";

const PARTICLE_COUNT = 10;
const BACKGROUND_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYqd3QP0uk5wX8oKxVJv3Z-aoM8hvcM4fiA-Gh9ZqVG_n9iO5CR_kjwMop1Cxxyo_rM_Gai0K_rZp1RGjqCp0Nrh9KcHBCKJnaIm1oiDn2V06ja1VIK0TA0n2-Ot3I9hXSOyuzap6qYlllDQtNGC5x1tdPLh1AAvwd0-zIEQ3wsn_Lpf7n0xidqYUd2nqyEmN0qw1jLyxX7JcjMu6SyLyaOqIgRyljA3mYQOC1AavlDAwX6Rsv6Yw-XS8ghwRENfDOldMJhhKq32y8";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center relative bg-[var(--background-dark)] text-white font-display">
      {/* Ambient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-[var(--background-dark)] to-[var(--background-dark)] opacity-40 pointer-events-none" />
        <ul className="particles" aria-hidden>
          {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
            <li key={i} className="particle" />
          ))}
        </ul>
      </div>

      {/* Mute toggle (top right) */}
      <div className="absolute top-8 right-8 z-20 animate-[fadeIn_3s_ease-out]">
        <button
          type="button"
          aria-label="Ses"
          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          <svg
            className="h-4 w-4 text-white/50 group-hover:text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        {/* Decorative line */}
        <div className="mb-8 opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent mx-auto" />
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight mb-4 text-white text-glow opacity-0 animate-[fadeIn_2.5s_ease-out_0.8s_forwards]">
          Our Story Begins<span className="text-primary">...</span>
        </h1>

        <p className="font-display font-light text-white/60 text-sm md:text-base tracking-[0.2em] uppercase mt-4 mb-12 max-w-lg mx-auto opacity-0 animate-[fadeIn_2.5s_ease-out_1.5s_forwards]">
          A chapter written in the stars
        </p>

        <div className="opacity-0 animate-[fadeInUp_2s_ease-out_2.5s_forwards]">
          <Link
            href="/loading"
            className="relative group inline-block"
            aria-label="Yolculuğumuza başla"
          >
            <span className="absolute -inset-1 bg-primary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <span className="relative flex items-center gap-3 px-8 py-4 bg-primary hover:bg-[var(--primary-dark)] text-white rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,77,109,0.4)] hover:shadow-[0_0_50px_rgba(255,77,109,0.6)] animate-heartbeat">
              <span className="font-display font-medium tracking-wide text-sm md:text-base">
                Start Our Journey
              </span>
              <span className="text-lg animate-pulse" aria-hidden>❤️</span>
              <svg
                className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </span>
          </Link>
        </div>
      </main>

      {/* Bottom label */}
      <div className="absolute bottom-12 w-full text-center z-10 opacity-0 animate-[fadeIn_3s_ease-out_3s_forwards]">
        <span className="text-white/20 text-xs font-display tracking-[0.3em] uppercase">
          Wiwi Production <span className="inline-block" aria-hidden>😎</span>
        </span>
      </div>

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-[1]"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    </div>
  );
}
