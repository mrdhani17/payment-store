import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import TechNodes from "../components/Fragments/TechNodes";
import Background from "../components/Fragments/Background";
import VideoClip from "../components/Fragments/VideoClip";

const ControlPage = () => {
  const { settings, updateSettings, updateButtonLabel, updateQRISImage, updateAudioUrl, updateLogoImage, updateVideoClip } = useTheme();
  const navigate = useNavigate();
  const [audioUrlInput, setAudioUrlInput] = useState(settings.audioUrl || "");

  const handleBackgroundStyleChange = (style) => {
    updateSettings({ backgroundStyle: style });
  };

  const handleCustomColorChange = (color) => {
    updateSettings({ backgroundColor: color, backgroundStyle: "custom" });
  };

  const handlePrimaryColorChange = (color) => {
    updateSettings({ primaryColor: color });
  };

  const handleQRISImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateQRISImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveQRISImage = () => {
    updateQRISImage(null);
  };

  const handleLogoImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateLogoImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogoImage = () => {
    updateLogoImage(null);
  };

  const handleVideoClipUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file (MP4, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateVideoClip(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveVideoClip = () => {
    updateVideoClip(null);
  };

  const handleAudioFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select a valid audio file (MP3, WAV, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateAudioUrl(event.target.result);
      setAudioUrlInput("");
    };
    reader.readAsDataURL(file);
  };

  const handleAudioUrlSubmit = () => {
    if (!audioUrlInput.trim()) {
      updateAudioUrl(null);
      return;
    }
    updateAudioUrl(audioUrlInput.trim());
  };

  const handleRemoveAudio = () => {
    setAudioUrlInput("");
    updateAudioUrl(null);
  };

  const handleReset = () => {
    setAudioUrlInput("");
    updateSettings({
      backgroundColor: "#050505",
      backgroundStyle: "dark",
      primaryColor: "#ef4444",
      qrisImage: null,
      audioUrl: null,
      logoImage: null,
      videoClip: null,
      buttonLabels: {
        dana: "Dana Balance",
        shopee: "Shopee Pay",
        qris: "QRIS Payment",
        testimonials: "All-Testimonials",
      },
    });
  };

  return (
    <>
      <TechNodes />
      <Background />
      
      <div className="min-h-screen flex items-center justify-center font-display text-white relative overflow-hidden px-3 sm:px-4 py-8 sm:py-12">
        <div className="w-full max-w-2xl relative z-10">
          <div className="cyber-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            {/* Video Clip */}
            <VideoClip />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">
                  Control <span className="text-primary">Panel</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">
                  Customize appearance
                </p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg bg-white/5 border border-white/20 hover:border-primary transition-colors active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <span className="material-icons text-primary">home</span>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="cyber-card rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary text-lg sm:text-xl">palette</span>
                  <span className="text-sm sm:text-base">Background Style</span>
                </h2>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                  <button
                    onClick={() => handleBackgroundStyleChange("dark")}
                    className={`p-2 sm:p-3 rounded-lg border transition-all min-h-[44px] active:scale-95 ${
                      settings.backgroundStyle === "dark"
                        ? "border-primary bg-primary/10"
                        : "border-white/20 bg-white/5 hover:border-primary/50"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-medium">Dark</div>
                  </button>
                  <button
                    onClick={() => handleBackgroundStyleChange("light")}
                    className={`p-2 sm:p-3 rounded-lg border transition-all min-h-[44px] active:scale-95 ${
                      settings.backgroundStyle === "light"
                        ? "border-primary bg-primary/10"
                        : "border-white/20 bg-white/5 hover:border-primary/50"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-medium">Light</div>
                  </button>
                  <button
                    onClick={() => handleBackgroundStyleChange("custom")}
                    className={`p-2 sm:p-3 rounded-lg border transition-all min-h-[44px] active:scale-95 ${
                      settings.backgroundStyle === "custom"
                        ? "border-primary bg-primary/10"
                        : "border-white/20 bg-white/5 hover:border-primary/50"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-medium">Custom</div>
                  </button>
                </div>
                {settings.backgroundStyle === "custom" && (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => handleCustomColorChange(e.target.value)}
                      className="w-full sm:w-12 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) => handleCustomColorChange(e.target.value)}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-lg text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-primary min-h-[44px]"
                      placeholder="#050505"
                    />
                  </div>
                )}
              </div>

              <div className="cyber-card rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary text-xl">color_lens</span>
                  Primary Color
                </h2>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handlePrimaryColorChange(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => handlePrimaryColorChange(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-primary"
                    placeholder="#ef4444"
                  />
                </div>
                <p className="text-xs text-white/40 mt-2">
                  Used for buttons, borders, and highlights
                </p>
              </div>

              <div className="cyber-card rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary text-xl">edit</span>
                  Button Labels
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1 block">
                      Dana Button
                    </label>
                    <input
                      type="text"
                      value={settings.buttonLabels.dana}
                      onChange={(e) => updateButtonLabel("dana", e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1 block">
                      ShopeePay Button
                    </label>
                    <input
                      type="text"
                      value={settings.buttonLabels.shopee}
                      onChange={(e) => updateButtonLabel("shopee", e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1 block">
                      QRIS Button
                    </label>
                    <input
                      type="text"
                      value={settings.buttonLabels.qris}
                      onChange={(e) => updateButtonLabel("qris", e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1 block">
                      All Testimonials Button
                    </label>
                    <input
                      type="text"
                      value={settings.buttonLabels.testimonials}
                      onChange={(e) => updateButtonLabel("testimonials", e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="cyber-card rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary text-xl">qr_code_2</span>
                  QRIS Image
                </h2>
                <div className="space-y-4">
                  {settings.qrisImage && (
                    <div className="relative bg-white rounded-lg p-4 max-w-xs mx-auto">
                      <img
                        src={settings.qrisImage}
                        alt="Current QRIS"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleQRISImageUpload}
                        className="hidden"
                      />
                      <div className="w-full py-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2">
                        <span className="material-icons text-lg">upload</span>
                        {settings.qrisImage ? "Replace Image" : "Upload Image"}
                      </div>
                    </label>
                    {settings.qrisImage && (
                      <button
                        onClick={handleRemoveQRISImage}
                        className="px-4 py-3 bg-white/5 border border-white/20 hover:border-red-500 hover:bg-red-500/10 rounded-lg text-white transition-all"
                      >
                        <span className="material-icons text-lg">delete</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/40">
                    Accepts PNG, JPG, WEBP formats. Image will be stored locally.
                  </p>
                </div>
              </div>

              <div className="cyber-card rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary text-xl">music_note</span>
                  Background Music
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">
                      Upload Audio File (MP3, WAV)
                    </label>
                    <label className="flex-1 cursor-pointer block">
                      <input
                        type="file"
                        accept="audio/mp3,audio/wav,audio/mpeg,audio/ogg"
                        onChange={handleAudioFileUpload}
                        className="hidden"
                      />
                      <div className="w-full py-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2">
                        <span className="material-icons text-lg">upload_file</span>
                        Upload Audio File
                      </div>
                    </label>
                  </div>
                  <div className="relative flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <span className="text-xs text-white/40">OR</span>
                    <div className="flex-1 h-px bg-white/20"></div>
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">
                      Audio URL (MP3, WAV, OGG)
                    </label>
                    <input
                      type="url"
                      value={audioUrlInput}
                      onChange={(e) => setAudioUrlInput(e.target.value)}
                      placeholder="https://example.com/audio.mp3"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAudioUrlSubmit}
                      className="flex-1 py-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span className="material-icons text-lg">play_arrow</span>
                      {settings.audioUrl ? "Update & Play" : "Load & Play"}
                    </button>
                    {settings.audioUrl && (
                      <button
                        onClick={handleRemoveAudio}
                        className="px-4 py-3 bg-white/5 border border-white/20 hover:border-red-500 hover:bg-red-500/10 rounded-lg text-white transition-all active:scale-95"
                      >
                        <span className="material-icons text-lg">stop</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/40">
                    Upload a file or enter a direct URL. Player will appear on home page.
                  </p>
                </div>
              </div>

              <div className="cyber-card rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary text-lg sm:text-xl">image</span>
                  <span className="text-sm sm:text-base">Logo Image</span>
                </h2>
                <div className="space-y-4">
                  {settings.logoImage && (
                    <div className="relative bg-white rounded-lg p-4 max-w-xs mx-auto">
                      <img
                        src={settings.logoImage}
                        alt="Current Logo"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleLogoImageUpload}
                        className="hidden"
                      />
                      <div className="w-full py-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[44px]">
                        <span className="material-icons text-lg">upload</span>
                        <span className="text-sm sm:text-base">{settings.logoImage ? "Replace Logo" : "Upload Logo"}</span>
                      </div>
                    </label>
                    {settings.logoImage && (
                      <button
                        onClick={handleRemoveLogoImage}
                        className="px-4 py-3 bg-white/5 border border-white/20 hover:border-red-500 hover:bg-red-500/10 rounded-lg text-white transition-all active:scale-95 min-h-[44px]"
                      >
                        <span className="material-icons text-lg">delete</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/40">
                    Default: assets/logo-nidalapstore.jpeg
                  </p>
                </div>
              </div>

              <div className="cyber-card rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary text-lg sm:text-xl">videocam</span>
                  <span className="text-sm sm:text-base">Video Clip</span>
                </h2>
                <div className="space-y-4">
                  {settings.videoClip && (
                    <div className="relative bg-black rounded-lg overflow-hidden max-w-xs mx-auto">
                      <video
                        src={settings.videoClip}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={handleVideoClipUpload}
                        className="hidden"
                      />
                      <div className="w-full py-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[44px]">
                        <span className="material-icons text-lg">upload</span>
                        <span className="text-sm sm:text-base">{settings.videoClip ? "Replace Video" : "Upload Video"}</span>
                      </div>
                    </label>
                    {settings.videoClip && (
                      <button
                        onClick={handleRemoveVideoClip}
                        className="px-4 py-3 bg-white/5 border border-white/20 hover:border-red-500 hover:bg-red-500/10 rounded-lg text-white transition-all active:scale-95 min-h-[44px]"
                      >
                        <span className="material-icons text-lg">delete</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/40">
                    Default: assets/clip.mp4. Accepts MP4, WebM, OGG formats.
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-icons text-lg">refresh</span>
                Reset to Default
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">
                Changes are saved automatically
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlPage;
