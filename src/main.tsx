
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check for Supabase environment variables
const missingSupabase = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create root element
const rootElement = document.getElementById("root");
if (rootElement) {
  // Display missing credentials message if needed
  if (missingSupabase) {
    // Add a discreet developer notification to the console
    console.info(
      "%c⚠️ Supabase Credentials Missing", 
      "background: #f0db4f; color: #000; padding: 5px; border-radius: 3px; font-weight: bold;"
    );
    console.info(
      "%cThe app is running in demo mode with mock data. To enable full functionality, add your Supabase credentials.",
      "color: #666; font-style: italic;"
    );
    
    // Log how to use the search feature in demo mode
    console.info(
      "%cTIP: Search functionality is active in demo mode. Try searching for hotels, flights, or packages!",
      "color: #3b82f6; font-style: italic; font-weight: bold;"
    );
  }
  
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}
