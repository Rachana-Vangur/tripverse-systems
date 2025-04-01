
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animation/FadeIn";
import { useNewsletter } from "@/hooks/useNewsletter";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { subscribeToNewsletter, isSubmitting } = useNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeToNewsletter(email);
  };

  return (
    <section className="py-16 bg-travel-gray-light">
      <div className="page-container">
        <div className="bg-white rounded-xl shadow-card p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <FadeIn direction="left">
                <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 mb-6">
                  Stay updated with our latest travel deals, new destinations, and travel tips.
                </p>
              </FadeIn>
            </div>
            
            <div>
              <FadeIn direction="right">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:border-travel-blue focus:ring focus:ring-travel-blue/20 transition-all duration-200"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-travel-blue text-white hover:bg-travel-blue-dark transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
                <p className="text-sm text-gray-500 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
