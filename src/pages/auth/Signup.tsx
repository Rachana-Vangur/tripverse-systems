
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserIcon, Lock, Mail, UserPlus, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { FadeIn } from "@/components/animation/FadeIn";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'agent' | 'hotel_staff',
    agreeToTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const { signup, error } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms agreement
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      
      toast({
        title: "Account created successfully",
        description: "Welcome to TripVerse!",
      });
      
      navigate('/');
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Signup failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-travel-gray-light">
        <div className="flex w-full max-w-6xl shadow-elevation rounded-xl overflow-hidden">
          <div className="hidden lg:block lg:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Signup" 
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h2 className="text-3xl font-bold font-display mb-3">Join our community</h2>
              <p className="text-white/80">Create an account to start planning your dream adventures.</p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-travel-blue h-5 w-5 mr-3" />
                  <span className="text-white/90">Access exclusive travel deals</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-travel-blue h-5 w-5 mr-3" />
                  <span className="text-white/90">Save and manage your favorite destinations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-travel-blue h-5 w-5 mr-3" />
                  <span className="text-white/90">Faster booking process</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-travel-blue h-5 w-5 mr-3" />
                  <span className="text-white/90">Personalized travel recommendations</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12">
            <FadeIn direction="up">
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-2xl font-bold font-display text-gray-900 mb-1">Create your account</h2>
                <p className="text-gray-600">Join TripVerse and start exploring the world</p>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`block w-full rounded-lg ${
                        formErrors.firstName 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20'
                      } transition-all duration-200`}
                      placeholder="Your first name"
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`block w-full rounded-lg ${
                        formErrors.lastName 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20'
                      } transition-all duration-200`}
                      placeholder="Your last name"
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 block w-full rounded-lg ${
                        formErrors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20'
                      } transition-all duration-200`}
                      placeholder="Your email address"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 pr-10 block w-full rounded-lg ${
                        formErrors.password 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20'
                      } transition-all duration-200`}
                      placeholder="Create a password"
                    />
                    <button 
                      type="button" 
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Password must be at least 8 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-10 block w-full rounded-lg ${
                        formErrors.confirmPassword 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-200 focus:border-travel-blue focus:ring-travel-blue/20'
                      } transition-all duration-200`}
                      placeholder="Confirm your password"
                    />
                    <button 
                      type="button" 
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    I am registering as a
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-200 focus:border-travel-blue focus:ring focus:ring-travel-blue/20 transition-all duration-200"
                  >
                    <option value="customer">Customer</option>
                    <option value="agent">Travel Agent</option>
                    <option value="hotel_staff">Hotel Staff</option>
                  </select>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className={`h-4 w-4 ${
                        formErrors.agreeToTerms 
                          ? 'text-red-600 focus:ring-red-200 border-red-300' 
                          : 'text-travel-blue focus:ring-travel-blue/20 border-gray-300'
                      } rounded`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-700">
                      I agree to the <a href="#" className="text-travel-blue hover:underline">Terms of Service</a> and <a href="#" className="text-travel-blue hover:underline">Privacy Policy</a>
                    </label>
                    {formErrors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.agreeToTerms}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-travel-blue text-white hover:bg-travel-blue-dark py-6 font-medium transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <UserPlus size={18} className="mr-2" />
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-center py-2.5 border border-gray-200 hover:bg-gray-50">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    Google
                  </Button>

                  <Button variant="outline" className="justify-center py-2.5 border border-gray-200 hover:bg-gray-50">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 2.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/>
                    </svg>
                    GitHub
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-travel-blue hover:text-travel-blue-dark">
                    Sign in
                  </Link>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
