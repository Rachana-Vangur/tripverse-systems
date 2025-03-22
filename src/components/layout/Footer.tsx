
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-travel-blue mb-4">
              Trip<span className="text-gray-800">Verse</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Discover extraordinary destinations and create unforgettable memories with our premium travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-travel-gray-dark hover:text-travel-blue transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-travel-gray-dark hover:text-travel-blue transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-travel-gray-dark hover:text-travel-blue transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-travel-gray-dark hover:text-travel-blue transition-colors duration-300">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-travel-gray-dark hover:text-travel-blue transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Destinations</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Hotels</Link>
              </li>
              <li>
                <Link to="/flights" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Flights</Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Packages</Link>
              </li>
              <li>
                <Link to="/tour-guides" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Tour Guides</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Refund Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-travel-blue transition-colors duration-200">Customer Support</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-travel-blue mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Travel Street, Tourism City, 10001, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-travel-blue mr-3 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-travel-blue mr-3 flex-shrink-0" />
                <span className="text-gray-600">info@tripverse.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TripVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
