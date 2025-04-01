
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
        
        // Check if we have real Supabase credentials or using fallback
        const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (isMockClient) {
          // Use mock data when Supabase is not configured
          const mockDestinations: Destination[] = [
            {
              id: 'dest-1',
              name: 'Santorini',
              location: 'Greece',
              image_url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3',
              rating: 4.9,
              description: 'Famous for its stunning caldera, whitewashed buildings, and sunsets.'
            },
            {
              id: 'dest-2',
              name: 'Bali',
              location: 'Indonesia',
              image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3',
              rating: 4.8,
              description: 'Beautiful beaches, lush rice terraces, and vibrant cultural experiences.'
            },
            {
              id: 'dest-3',
              name: 'Tokyo',
              location: 'Japan',
              image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1788&auto=format&fit=crop&ixlib=rb-4.0.3',
              rating: 4.7,
              description: 'An ultramodern city with traditional temples and gardens.'
            },
            {
              id: 'dest-4',
              name: 'Swiss Alps',
              location: 'Switzerland',
              image_url: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
              rating: 4.9,
              description: 'Majestic mountains, pristine lakes, and charming villages.'
            },
          ];
          
          setDestinations(mockDestinations);
          setFeaturedDestinations(mockDestinations.slice(0, 4));
          setError(null);
          return;
        }
        
        // Real Supabase query (only runs if credentials are available)
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
