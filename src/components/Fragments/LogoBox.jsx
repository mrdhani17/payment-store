import { useTheme } from "../../context/ThemeContext";
import logoDefault from "../../assets/logo-nidalapstore.jpeg";

export default function LogoBox() {
  const { settings } = useTheme();
  const logoSrc = settings.logoImage || logoDefault;

  return (
    <img
      src={logoSrc}
      alt="Logo"
      className="w-40 h-40 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-2xl mb-4 sm:mb-5 md:mb-6"
      onError={(e) => {
        e.target.src = logoDefault;
      }}
    />
  );
}
