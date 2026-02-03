import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function AudioPlayer() {
  const { settings } = useTheme();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!settings.audioUrl) {
      setIsPlaying(false);
      setError(null);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    setIsLoading(true);
    setError(null);

    audio.src = settings.audioUrl;
    audio.load();

    const handleCanPlay = () => {
      setIsLoading(false);
      audio.play().catch((err) => {
        setError("Failed to play audio");
        setIsPlaying(false);
      });
      setIsPlaying(true);
    };

    const handleError = () => {
      setIsLoading(false);
      setError("Failed to load audio. Check URL.");
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [settings.audioUrl]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !settings.audioUrl) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => {
        setError("Failed to play audio");
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  if (!settings.audioUrl) return null;

  return (
    <>
      <audio ref={audioRef} />
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 left-4 sm:left-auto z-50">
        <div className="cyber-card rounded-xl p-3 sm:p-4 w-full sm:min-w-50">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-10 h-10 sm:w-12 sm:h-12 min-w-[40px] min-h-[40px] sm:min-w-[48px] sm:min-h-[48px] rounded-full bg-primary/20 hover:bg-primary/30 disabled:bg-white/5 border border-primary/30 flex items-center justify-center transition-all active:scale-95"
            >
              <span className="material-icons text-primary text-lg sm:text-xl">
                {isLoading ? "hourglass_empty" : isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              onClick={handleStop}
              disabled={isLoading}
              className="w-10 h-10 sm:w-12 sm:h-12 min-w-[40px] min-h-[40px] sm:min-w-[48px] sm:min-h-[48px] rounded-full bg-white/5 hover:bg-white/10 disabled:bg-white/5 border border-white/20 flex items-center justify-center transition-all active:scale-95"
            >
              <span className="material-icons text-white/60 text-lg sm:text-xl">stop</span>
            </button>
            <div className="flex-1 min-w-0">
              {error ? (
                <p className="text-xs text-red-500 truncate">{error}</p>
              ) : isLoading ? (
                <p className="text-xs text-white/40 truncate">Loading...</p>
              ) : (
                <p className="text-xs text-white/60 truncate">
                  {isPlaying ? "Playing" : "Paused"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
