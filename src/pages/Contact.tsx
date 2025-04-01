
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/animation/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Contact Us" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
              Contact Us
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </FadeIn>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <FadeIn direction="right">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have a question about your booking, need travel advice, or want to partner with us? 
                  Our team is here to help. Fill out the form and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-travel-blue mr-4 mt-1" size={24} />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                      <p className="text-gray-600 mt-1">
                        123 Travel Street, Tourism City<br />
                        10001, Country
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-travel-blue mr-4 mt-1" size={24} />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                      <p className="text-gray-600 mt-1">
                        <a href="mailto:info@tripverse.com" className="hover:text-travel-blue">info@tripverse.com</a><br />
                        <a href="mailto:support@tripverse.com" className="hover:text-travel-blue">support@tripverse.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-travel-blue mr-4 mt-1" size={24} />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                      <p className="text-gray-600 mt-1">
                        +1 (555) 123-4567<br />
                        +1 (555) 987-6543
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <div>
              <FadeIn direction="left">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-travel-blue hover:bg-travel-blue-dark text-white">
                      <Send className="mr-2" size={18} />
                      Send Message
                    </Button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Visit our office or reach out to us online. We're always happy to help.
              </p>
            </FadeIn>
          </div>
          
          <FadeIn>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[400px] bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto text-travel-blue mb-4" size={40} />
                  <p className="text-gray-600">Interactive map would be displayed here</p>
                  <p className="text-gray-500 text-sm mt-2">123 Travel Street, Tourism City, 10001</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
