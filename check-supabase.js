// Quick diagnostic script to check Supabase setup
// Run with: node check-supabase.js

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking Supabase Configuration...\n');

// Check if .env file exists
try {
  const envPath = join(__dirname, '.env');
  const envContent = readFileSync(envPath, 'utf8');
  
  const hasUrl = envContent.includes('VITE_SUPABASE_URL=');
  const hasKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');
  
  console.log('✅ .env file found');
  console.log(`${hasUrl ? '✅' : '❌'} VITE_SUPABASE_URL ${hasUrl ? 'present' : 'missing'}`);
  console.log(`${hasKey ? '✅' : '❌'} VITE_SUPABASE_ANON_KEY ${hasKey ? 'present' : 'missing'}`);
  
  if (hasUrl && hasKey) {
    console.log('\n✅ Configuration looks good!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure you ran the SQL script in Supabase');
    console.log('2. Restart your dev server: npm run dev');
    console.log('3. Check the test component in bottom-left of your app');
  } else {
    console.log('\n❌ Configuration incomplete');
    console.log('Please add missing variables to .env file');
  }
} catch (error) {
  console.log('❌ .env file not found');
  console.log('\n📝 Create a .env file with:');
  console.log('VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.log('VITE_SUPABASE_ANON_KEY=your-anon-key', error);
}

console.log('\n💡 Tip: After creating/updating .env, restart your dev server!');
