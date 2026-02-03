import { useEffect } from "react";

export default function SuccessModal({ isOpen, onClose, message }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(onClose, 2500);
      return () => {
        document.body.style.overflow = "unset";
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div
        className="relative bg-[#0a0a0f] border border-primary/30 rounded-xl p-6 max-w-sm w-full shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <span className="material-icons text-xl">close</span>
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <span className="material-icons text-green-500 text-2xl">
              check_circle
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Berhasil</h3>
          <p className="text-white/70 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
