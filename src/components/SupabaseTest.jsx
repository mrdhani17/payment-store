import { useEffect, useState } from 'react';
import { themeApi } from '../services/themeApi';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');
  const [theme, setTheme] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Check if env variables are loaded
        const hasUrl = !!import.meta.env.VITE_SUPABASE_URL;
        const hasKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!hasUrl || !hasKey) {
          setError('❌ Environment variables not found. Make sure .env file exists and dev server was restarted.');
          setStatus('Configuration Error');
          return;
        }

        setStatus('✅ Environment variables loaded');
        
        // Try to fetch theme
        const globalTheme = await themeApi.getGlobalTheme();
        
        if (globalTheme) {
          setTheme(globalTheme);
          setStatus('✅ Successfully connected to Supabase!');
        } else {
          setStatus('⚠️ Connected but no theme found in database');
        }
      } catch (err) {
        setError(`❌ Error: ${err.message}`);
        setStatus('Connection Failed');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/90 border border-primary/30 rounded-lg p-4 max-w-md">
      <h3 className="text-white font-bold mb-2">Supabase Connection Test</h3>
      <p className="text-white/80 text-sm mb-2">{status}</p>
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
      {theme && (
        <div className="text-xs text-white/60">
          <p>Primary Color: {theme.primaryColor}</p>
          <p>Background: {theme.backgroundStyle}</p>
        </div>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-3 py-1 bg-primary/20 hover:bg-primary/30 text-white text-xs rounded"
      >
        Retry
      </button>
    </div>
  );
}
