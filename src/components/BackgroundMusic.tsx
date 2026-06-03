import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating ambient-music toggle. Persists user preference in localStorage.
 * Track: "Inspired" by Kevin MacLeod — incompetech.com (CC BY 4.0).
 * Hosted on archive.org for stable hot-linking.
 */
const TRACK_URL =
  "https://archive.org/download/Kevin_MacLeod_-_Calm/Kevin_MacLeod_-_07_-_Inspired.mp3";
const TRACK_TITLE = "Inspired — Kevin MacLeod (CC BY 4.0)";
const STORAGE_KEY = "tradehq:bg-music-on";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = new Audio(TRACK_URL);
    a.loop = true;
    a.volume = 0.18;
    a.preload = "none";
    a.crossOrigin = "anonymous";
    audioRef.current = a;
    setReady(true);

    // Restore preference (but never autoplay without a prior gesture)
    const wanted = localStorage.getItem(STORAGE_KEY) === "1";
    if (wanted) {
      // Try resume — most browsers allow after first nav from a gesture
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "0");
    } else {
      a.play()
        .then(() => {
          setPlaying(true);
          localStorage.setItem(STORAGE_KEY, "1");
        })
        .catch(() => setPlaying(false));
    }
  };

  if (!ready) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute background music" : "Play background music"}
      title={`${playing ? "Mute" : "Play"} ambient music · ${TRACK_TITLE}`}
      className={cn(
        "fixed z-40 bottom-20 right-4 md:bottom-6 md:right-6",
        "h-11 w-11 rounded-full flex items-center justify-center",
        "border border-white/10 backdrop-blur-xl transition-all active:scale-90",
        "shadow-[0_6px_24px_-6px_hsl(0_0%_0%/0.6)]",
        playing
          ? "bg-primary/20 border-primary/40 text-primary"
          : "bg-black/40 text-foreground/70 hover:text-foreground hover:bg-black/60",
      )}
    >
      {playing ? (
        <Music2 className="w-4 h-4 animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
      {playing && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-primary/40 animate-ping"
        />
      )}
    </button>
  );
}