
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for Supabase tables
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: 'customer' | 'agent' | 'hotel_staff';
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name: string;
          last_name: string;
          role: 'customer' | 'agent' | 'hotel_staff';
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          first_name?: string;
          last_name?: string;
          role?: 'customer' | 'agent' | 'hotel_staff';
          avatar_url?: string;
          updated_at?: string;
        };
      };
      destinations: {
        Row: {
          id: string;
          name: string;
          location: string;
          image_url: string;
          description: string;
          rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          image_url: string;
          description: string;
          rating: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          location?: string;
          image_url?: string;
          description?: string;
          rating?: number;
          updated_at?: string;
        };
      };
      hotels: {
        Row: {
          id: string;
          name: string;
          location: string;
          image_url: string;
          description: string;
          price_per_night: number;
          rating: number;
          amenities: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          image_url: string;
          description: string;
          price_per_night: number;
          rating: number;
          amenities: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          location?: string;
          image_url?: string;
          description?: string;
          price_per_night?: number;
          rating?: number;
          amenities?: string[];
          updated_at?: string;
        };
      };
      flights: {
        Row: {
          id: string;
          airline: string;
          origin: string;
          destination: string;
          departure_date: string;
          return_date?: string;
          price: number;
          flight_duration: string;
          image_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          airline: string;
          origin: string;
          destination: string;
          departure_date: string;
          return_date?: string;
          price: number;
          flight_duration: string;
          image_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          airline?: string;
          origin?: string;
          destination?: string;
          departure_date?: string;
          return_date?: string;
          price?: number;
          flight_duration?: string;
          image_url?: string;
          updated_at?: string;
        };
      };
      packages: {
        Row: {
          id: string;
          title: string;
          location: string;
          description: string;
          price: number;
          discount?: number;
          duration: string;
          group_size: string;
          start_date: string;
          image_url: string;
          features: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          location: string;
          description: string;
          price: number;
          discount?: number;
          duration: string;
          group_size: string;
          start_date: string;
          image_url: string;
          features: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          location?: string;
          description?: string;
          price?: number;
          discount?: number;
          duration?: string;
          group_size?: string;
          start_date?: string;
          image_url?: string;
          features?: string[];
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          booking_type: 'hotel' | 'flight' | 'package';
          item_id: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          amount: number;
          booking_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          booking_type: 'hotel' | 'flight' | 'package';
          item_id: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          amount: number;
          booking_date: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          booking_type?: 'hotel' | 'flight' | 'package';
          item_id?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          amount?: number;
          booking_date?: string;
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
        };
        Update: {
          email?: string;
          subscribed_at?: string;
        };
      };
    };
  };
};
