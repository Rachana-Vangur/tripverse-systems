
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexWrapper from '@/pages/IndexWrapper';
import Hotels from '@/pages/Hotels';
import Flights from '@/pages/Flights';
import Destinations from '@/pages/Destinations';
import Packages from '@/pages/Packages';
import TourGuides from '@/pages/TourGuides';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tripverse-theme">
      <Router>
        <Routes>
          <Route path="/" element={<IndexWrapper />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/tour-guides" element={<TourGuides />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
