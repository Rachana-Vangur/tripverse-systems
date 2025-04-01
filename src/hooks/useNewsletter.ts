
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useNewsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const subscribeToNewsletter = async (email: string) => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if we're using mock client
      const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (isMockClient) {
        // Simulate successful subscription with mock data
        console.log('Mock subscription to newsletter with email:', email);
        
        // Simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        toast({
          title: "Subscription successful!",
          description: "You've been subscribed to our newsletter (demo mode).",
          variant: "default"
        });
        
        return;
      }
      
      // Real Supabase implementation
      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('email', email)
        .single();

      if (existingSubscriber) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "default"
        });
        return;
      }

      // Add new subscriber
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          subscribed_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Subscription successful!",
        description: "You've been subscribed to our newsletter.",
        variant: "default"
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "We couldn't process your subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    subscribeToNewsletter,
    isSubmitting
  };
};
