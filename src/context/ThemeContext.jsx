import { createContext, useContext, useState, useEffect } from "react";
import { themeApi } from "../services/themeApi";

const ThemeContext = createContext();

const defaultSettings = {
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
};

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    // Start with localStorage as cache
    const cached = localStorage.getItem("themeSettings");
    return cached ? JSON.parse(cached) : defaultSettings;
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch global theme on mount
  useEffect(() => {
    async function loadGlobalTheme() {
      const globalTheme = await themeApi.getGlobalTheme();
      
      if (globalTheme) {
        // Global theme exists - use it and update cache
        setSettings(globalTheme);
        localStorage.setItem("themeSettings", JSON.stringify(globalTheme));
      }
      // If no global theme, keep using cached/default
      
      setIsLoading(false);
    }
    
    loadGlobalTheme();
  }, []);

  // Update localStorage whenever settings change (cache)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("themeSettings", JSON.stringify(settings));
      document.documentElement.style.setProperty("--color-primary", settings.primaryColor);
    }
  }, [settings, isLoading]);

  const updateSettings = async (updates) => {
    const newSettings = { ...settings, ...updates };
    
    // Update local state immediately (optimistic update)
    setSettings(newSettings);
    
    // If admin, sync to backend
    if (isAdmin) {
      try {
        await themeApi.updateGlobalTheme(newSettings, 'DANISTORE');
      } catch (error) {
        console.error('Failed to sync theme to server:', error);
        // Could show error notification here
      }
    }
  };

  const updateButtonLabel = (key, value) => {
    updateSettings({
      buttonLabels: { ...settings.buttonLabels, [key]: value },
    });
  };

  const updateQRISImage = (imageDataUrl) => {
    updateSettings({ qrisImage: imageDataUrl });
  };

  const updateAudioUrl = (url) => {
    updateSettings({ audioUrl: url });
  };

  const updateLogoImage = (imageDataUrl) => {
    updateSettings({ logoImage: imageDataUrl });
  };

  const updateVideoClip = (videoDataUrl) => {
    updateSettings({ videoClip: videoDataUrl });
  };

  const setAdminMode = (isAdminMode) => {
    setIsAdmin(isAdminMode);
  };

  return (
    <ThemeContext.Provider value={{ 
      settings, 
      updateSettings, 
      updateButtonLabel, 
      updateQRISImage, 
      updateAudioUrl, 
      updateLogoImage, 
      updateVideoClip,
      setAdminMode,
      isAdmin,
      isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
