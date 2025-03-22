
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User types based on roles
export type UserRole = 'customer' | 'agent' | 'hotel_staff';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  error: string | null;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  error: null,
});

// Sample mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    email: 'agent@example.com',
    firstName: 'Sarah',
    lastName: 'Smith',
    role: 'agent',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1522&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    email: 'staff@example.com',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: 'hotel_staff',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user in localStorage on initial load
    const storedUser = localStorage.getItem('tripverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call to authenticate user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the user by email and role (in a real app, this would be a server validation)
      const foundUser = mockUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.role === role
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // In a real auth system, you'd verify the password here
      if (password !== 'password') { // Using a simple password for demo
        throw new Error('Invalid email or password');
      }
      
      // Store user in state and localStorage
      setUser(foundUser);
      localStorage.setItem('tripverse_user', JSON.stringify(foundUser));
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call to register user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const userExists = mockUsers.some(u => 
        u.email.toLowerCase() === userData.email.toLowerCase()
      );
      
      if (userExists) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in a real app, this would be handled by the server)
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      localStorage.setItem('tripverse_user', JSON.stringify(newUser));
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear user from state and localStorage
    setUser(null);
    localStorage.removeItem('tripverse_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
