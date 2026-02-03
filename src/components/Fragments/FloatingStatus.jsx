import { useState } from "react";

export default function FloatingStatus() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-max px-6 py-2 bg-black/80 border border-white/10 rounded-full backdrop-blur-md flex items-center gap-4 text-xs font-mono text-white/60">
      <span className="flex items-center gap-2">
        <span className="material-icons text-xs text-primary">
          verified_user
        </span>
        Transaction Secured
      </span>
      <div className="w-px h-3 bg-white/10"></div>
      <button
        onClick={() => setIsVisible(false)}
        className="hover:text-primary transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}
