import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    scheme: "PM-KISAN",
    rating: 5,
    text: "The platform made it incredibly easy to apply for PM-KISAN. I received my benefits within 2 weeks. The process was transparent and user-friendly.",
    avatar: "/api/placeholder/64/64",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Maharashtra",
    scheme: "Mudra Yojana",
    rating: 5,
    text: "Got a loan of ₹5 lakh for my small business through this platform. The guidance and support throughout the process was exceptional.",
    avatar: "/api/placeholder/64/64",
    verified: true
  },
  {
    id: 3,
    name: "Sunita Devi",
    location: "Bihar",
    scheme: "Ayushman Bharat",
    rating: 5,
    text: "My family's medical treatment was covered under Ayushman Bharat. The platform helped me understand the benefits clearly.",
    avatar: "/api/placeholder/64/64",
    verified: true
  },
  {
    id: 4,
    name: "Mohammad Ali",
    location: "Uttar Pradesh",
    scheme: "PM Awas Yojana",
    rating: 5,
    text: "Finally got my own house through PM Awas Yojana. The application process was smooth and I received regular updates.",
    avatar: "/api/placeholder/64/64",
    verified: true
  },
  {
    id: 5,
    name: "Lakshmi Menon",
    location: "Kerala",
    scheme: "Scholarship Portal",
    rating: 5,
    text: "My daughter received scholarship for her engineering studies. The platform made finding and applying for scholarships so simple.",
    avatar: "/api/placeholder/64/64",
    verified: true
  },
  {
    id: 6,
    name: "Arjun Singh",
    location: "Rajasthan",
    scheme: "Jan Aushadhi",
    rating: 5,
    text: "Finding affordable medicines for my elderly parents became easier with Jan Aushadhi scheme information on this platform.",
    avatar: "/api/placeholder/64/64",
    verified: true
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from citizens who have benefited from government schemes through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-foreground text-sm">
                          {testimonial.name}
                        </p>
                        {testimonial.verified && (
                          <div className="w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {testimonial.scheme}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-background/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Join Millions of Satisfied Citizens
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Over 2.5 million citizens have successfully accessed government schemes through our platform. 
            Your success story could be next.
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">4.8/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">24hrs</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Free Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;