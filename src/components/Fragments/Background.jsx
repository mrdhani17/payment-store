import { useTheme } from "../../context/ThemeContext";

export default function Background() {
  const { settings } = useTheme();

  const getBackgroundStyle = () => {
    const { backgroundStyle, backgroundColor, primaryColor } = settings;
    
    if (backgroundStyle === "light") {
      return {
        backgroundColor: "#f8fafc",
        backgroundImage: `
          radial-gradient(circle at 50% 50%, ${primaryColor}10 0%, transparent 70%),
          linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
      };
    }

    if (backgroundStyle === "custom") {
      return {
        backgroundColor,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, ${primaryColor}0D 0%, transparent 70%),
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
      };
    }

    return {
      backgroundColor: "#050505",
      backgroundImage: `
        radial-gradient(circle at 50% 50%, ${primaryColor}0D 0%, transparent 70%),
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: "100% 100%, 40px 40px, 40px 40px",
    };
  };

  return <div className="fixed inset-0 -z-10" style={getBackgroundStyle()} />;
}
