import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import TechNodes from "../components/Fragments/TechNodes";
import SettingsButton from "../components/Fragments/SettingsButton";
import LogoBox from "../components/Fragments/LogoBox";
import PaymentButton from "../components/Fragments/PaymentButton";
import FloatingStatus from "../components/Fragments/FloatingStatus";
import SuccessModal from "../components/Fragments/SuccessModal";
import QRISModal from "../components/Fragments/QRISModal";
import PasswordModal from "../components/Fragments/PasswordModal";
import AudioPlayer from "../components/Fragments/AudioPlayer";
import SupabaseTest from "../components/SupabaseTest";
import qrisImageDefault from "../assets/qriss-image.png";

export default function HomePage() {
  const { settings, isLoading } = useTheme();
  const [modalState, setModalState] = useState({ isOpen: false, message: "" });
  const [qrisModalOpen, setQrisModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const qrisImage = settings.qrisImage || qrisImageDefault;

  const handleCopy = (number, message) => {
    navigator.clipboard.writeText(number).then(() => {
      setModalState({ isOpen: true, message });
    });
  };

  const handleTestimoni = () => {
    window.open('https://whatsapp.com/channel/0029Vb6cjBmHrDZa4e0Cmc0w', '_blank');
  };

  const handleQRIS = () => {
    setQrisModalOpen(true);
  };

  const paymentMethods = [
    {
      label: settings.buttonLabels.dana,
      href: "#dana",
      onClick: () => handleCopy('083833168136', 'Nomor Dana berhasil disalin'),
      icon: (
        <div className="w-8 h-8 bg-[#108ee9] rounded-lg flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">DANA</span>
        </div>
      ),
    },
    {
      label: settings.buttonLabels.shopee,
      href: "#shopee",
      onClick: () => handleCopy('085880788073', 'Nomor ShopeePay berhasil disalin'),
      icon: (
        <div className="w-8 h-8 bg-[#ee4d2d] rounded-lg flex items-center justify-center">
          <span className="material-icons text-white text-lg">
            shopping_bag
          </span>
        </div>
      ),
    },
    {
      label: settings.buttonLabels.qris,
      href: "#qris",
      onClick: handleQRIS,
      icon: "qr_code_2",
    },
    {
      label: settings.buttonLabels.testimonials || "All-Testimonials",
      href: "https://wa.me",
      onClick: handleTestimoni,
      isExternal: true,
      icon: (
        <div className="w-8 h-8 bg-[#25D366]/20 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-3.313c1.559.924 3.127 1.387 4.988 1.388 5.454 0 9.893-4.439 9.895-9.895.002-2.644-1.029-5.129-2.903-7.005-1.871-1.875-4.359-2.907-7.01-2.908-5.455 0-9.894 4.44-9.897 9.896-.001 1.961.579 3.827 1.674 5.404l-1.096 4.008 4.137-1.085z"></path>
          </svg>
        </div>
      ),
    },
  ];

  // Show loading state while fetching global theme
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-white text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-white/60">Loading theme...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Tech nodes and decorations */}
      <TechNodes />

      {/* Settings button */}
      <SettingsButton onClick={() => setPasswordModalOpen(true)} />

      {/* Main content */}
      <main className="min-h-screen flex items-center justify-center font-display text-white relative overflow-hidden p-4 sm:p-6">
        <div className="w-full max-w-md px-4 sm:px-6 py-8 sm:py-12 relative z-10">
          <div className="cyber-card rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center">
            {/* Logo Box */}
            <LogoBox />

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary/60 font-mono mb-2">
                Secure Payment Gateway
              </p>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase">
                payment{" "}
                <span className="text-primary italic">NIDALOPSTORE</span>
              </h1>
              <div className="h-0.5 w-10 sm:w-12 bg-primary mx-auto mt-3 sm:mt-4 rounded-full"></div>
            </div>

            {/* Payment Methods */}
            <div className="w-full space-y-3 sm:space-y-4">
              {paymentMethods.map((method, index) => (
                <PaymentButton
                  key={index}
                  label={method.label}
                  href={method.href}
                  icon={method.icon}
                  isExternal={method.isExternal}
                  onClick={method.onClick}
                />
              ))}
            </div>

            {/* Footer info */}
            <div className="mt-8 sm:mt-12 w-full flex flex-col items-center gap-2">
              <div className="text-[9px] sm:text-[10px] font-mono text-white/30 uppercase tracking-[0.25em] sm:tracking-[0.3em] text-center">
                Encrypted // Node: ZX-99
              </div>
              <div className="text-[8px] sm:text-[9px] text-primary/50 font-mono">
                © 2024 NIDALOPSTORE SYSTEMS
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-2 text-[9px] sm:text-[10px] font-mono text-primary/40 uppercase tracking-wider sm:tracking-widest">
            <span>Core_OS: v4.2.0</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Secure Link: Online
            </span>
          </div>
        </div>
      </main>

      {/* Floating status */}
      <FloatingStatus />

      {/* Success Modal */}
      <SuccessModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, message: "" })}
        message={modalState.message}
      />

      {/* QRIS Modal */}
      <QRISModal
        isOpen={qrisModalOpen}
        onClose={() => setQrisModalOpen(false)}
        imageSrc={qrisImage}
      />

      {/* Password Modal */}
      <PasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />

      {/* Audio Player */}
      <AudioPlayer />
    </>
  );
}
