import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Site Map", href: "#" }
  ];

  const categories = [
    { name: "Education Schemes", href: "#" },
    { name: "Healthcare Benefits", href: "#" },
    { name: "Housing Programs", href: "#" },
    { name: "Employment Schemes", href: "#" },
    { name: "Agriculture Support", href: "#" },
    { name: "Women Empowerment", href: "#" }
  ];

  const resources = [
    { name: "How to Apply", href: "#" },
    { name: "Eligibility Checker", href: "#" },
    { name: "Document Guide", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Video Tutorials", href: "#" },
    { name: "Success Stories", href: "#" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="text-2xl font-bold">
                GovSchemes
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Your trusted platform for discovering and accessing government schemes. 
                Empowering citizens with easy access to benefits and opportunities.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>1800-123-4567 (Toll Free)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>support@govschemes.in</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scheme Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Popular Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a 
                      href={category.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <a 
                      href={resource.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © 2024 GovSchemes Platform. All rights reserved. | A Digital India Initiative
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-primary-foreground/80">Follow us:</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-foreground/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-foreground/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-foreground/10">
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-foreground/10">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;