
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Flights', path: '/flights' },
    { name: 'Packages', path: '/packages' },
    { name: 'Tour Guides', path: '/tour-guides' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-3",
        isScrolled ? "glass-nav shadow-subtle py-2" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h2 className="text-2xl font-display font-bold text-travel-blue">
                Trip<span className="text-gray-800">Verse</span>
              </h2>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "nav-link text-sm font-medium",
                    location.pathname === link.path ? "active" : ""
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-lg shadow-subtle transition-all duration-300"
              >
                <User size={18} />
                <span className="text-sm font-medium">Account</span>
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-elevation border border-gray-100 animate-fade-in z-50">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-travel-blue hover:text-white transition-colors duration-200"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-travel-blue hover:text-white transition-colors duration-200"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/login">
              <Button variant="ghost" className="text-travel-blue border border-travel-blue/20 hover:bg-travel-blue hover:text-white transition-all duration-300">
                Sign In
              </Button>
            </Link>
            
            <Link to="/signup">
              <Button className="bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300">
                Sign Up
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md shadow-subtle animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                location.pathname === link.path
                  ? "text-travel-blue bg-travel-blue-light/30"
                  : "text-gray-700 hover:bg-travel-blue-light/30 hover:text-travel-blue"
              )}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 rounded-full bg-travel-blue/10 p-1 text-travel-blue" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Account</div>
                <div className="text-sm font-medium text-gray-500">Access your account</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-travel-blue-light/30 hover:text-travel-blue transition-all duration-200"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-travel-blue-light/30 hover:text-travel-blue transition-all duration-200"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
