export default function SettingsButton({ onClick }) {
  return (
    <div className="fixed top-8 right-8 z-50">
      <button
        onClick={onClick}
        className="p-2 rounded-full bg-black/40 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_10px_rgba(239,68,68,0.3)]"
        aria-label="Settings"
      >
        <span className="material-icons text-xl">settings</span>
      </button>
    </div>
  );
}
