import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function PasswordModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setAdminMode } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPassword("");
      setError("");
      setShowPassword(false);
      setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setError("");

    setTimeout(() => {
      if (password === "DANISTORE") {
        setAdminMode(true); // Mark user as admin
        onClose();
        navigate("/control");
      } else {
        setError("Password salah");
        setIsChecking(false);
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div
        className="relative bg-[#0a0a0f] border border-primary/30 rounded-xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <span className="material-icons text-xl">close</span>
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-icons text-primary text-xl">lock</span>
            </div>
            <h3 className="text-xl font-bold text-white">Settings Access</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isChecking}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <span className="material-icons text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="material-icons text-sm">error</span>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isChecking || !password}
              className="w-full py-3 bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/40 text-white font-medium rounded-lg transition-colors"
            >
              {isChecking ? "Checking..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
