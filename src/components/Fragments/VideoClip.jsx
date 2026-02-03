import { useTheme } from "../../context/ThemeContext";
import clipDefault from "../../assets/clip.mp4";

export default function VideoClip() {
  const { settings } = useTheme();
  const videoSrc = settings.videoClip || clipDefault;

  return (
    <div className="w-full mb-4 sm:mb-5 md:mb-6 mt-2 sm:mt-3 rounded-xl sm:rounded-2xl overflow-hidden h-32 sm:h-40 md:h-48">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
}
