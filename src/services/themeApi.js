import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

// Only initialize if credentials are provided
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const themeApi = {
  // Fetch global theme settings
  async getGlobalTheme() {
    if (!supabase) {
      console.warn('Supabase not configured. Using local storage only.');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('settings')
        .eq('id', 1)
        .single();
      
      if (error) {
        // If table doesn't exist or no data, return null (use defaults)
        if (error.code === 'PGRST116' || error.code === '42P01') {
          console.log('No global theme found, using defaults');
          return null;
        }
        throw error;
      }
      
      return data?.settings || null;
    } catch (error) {
      console.error('Error fetching theme from Supabase:', error);
      return null;
    }
  },

  // Update global theme (admin only)
  async updateGlobalTheme(settings, adminPassword) {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    try {
      // Verify admin password
      const { data: authData, error: authError } = await supabase
        .from('admin_auth')
        .select('password')
        .eq('id', 1)
        .single();
      
      if (authError || authData?.password !== adminPassword) {
        throw new Error('Unauthorized: Invalid admin password');
      }

      // Update theme settings
      const { data, error } = await supabase
        .from('theme_settings')
        .upsert({ 
          id: 1, 
          settings,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return data.settings;
    } catch (error) {
      console.error('Error updating theme in Supabase:', error);
      throw error;
    }
  }
};
