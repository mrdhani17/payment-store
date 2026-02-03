import { useEffect } from "react";

export default function QRISModal({ isOpen, onClose, imageSrc }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div
        className="relative bg-[#0a0a0f] border border-primary/30 rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
        >
          <span className="material-icons text-xl">close</span>
        </button>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-white mb-4">QRIS Payment</h3>
          <div className="w-full bg-white rounded-lg p-4">
            <img
              src={imageSrc}
              alt="QRIS Code"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-white/50 text-xs mt-4 text-center">
            Scan QR code dengan aplikasi pembayaran Anda
          </p>
        </div>
      </div>
    </div>
  );
}
