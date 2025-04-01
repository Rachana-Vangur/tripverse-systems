
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Destination {
  id: string;
  name: string;
  location: string;
  image_url: string;
  rating: number;
  description?: string;
}

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all destinations
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('rating', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          setDestinations(data);
          // Get top 4 destinations for featured section
          setFeaturedDestinations(data.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDestinations();
  }, []);

  return {
    destinations,
    featuredDestinations,
    isLoading,
    error
  };
};
