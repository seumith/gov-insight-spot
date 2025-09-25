import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Clock, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Citizen-Centered",
      description: "Designed with citizens in mind, making government schemes accessible to everyone.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security measures.",
    },
    {
      icon: Clock,
      title: "Always Updated",
      description: "Real-time updates ensure you never miss new schemes or deadlines.",
    },
    {
      icon: Award,
      title: "Verified Information",
      description: "All scheme information is verified and sourced directly from government sources.",
    },
  ];

  const stats = [
    { label: "Active Schemes", value: "2,500+" },
    { label: "Users Helped", value: "50,000+" },
    { label: "Applications Processed", value: "1M+" },
    { label: "Government Partners", value: "200+" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">About GovSchemes</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Bridging Citizens and Government
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              We're on a mission to make government schemes accessible, understandable, and easy to apply for. 
              Every citizen deserves to know about the benefits they're entitled to.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Mission</h2>
            <div className="bg-gradient-subtle rounded-2xl p-8 md:p-12 shadow-elegant">
              <p className="text-lg leading-relaxed text-center">
                To democratize access to government schemes by creating a comprehensive, user-friendly platform 
                that connects citizens with the benefits they deserve. We believe that information about government 
                schemes should be transparent, easily accessible, and available to everyone, regardless of their 
                technical expertise or background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose GovSchemes?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                GovSchemes was born from a simple observation: millions of citizens were missing out on 
                government benefits simply because they didn't know these schemes existed or found the 
                application process too complex.
              </p>
              <p>
                Our team of passionate developers, policy experts, and user experience designers came together 
                with a shared vision - to create a bridge between government initiatives and the citizens they're 
                meant to serve.
              </p>
              <p>
                Today, we're proud to be the most comprehensive government schemes platform, helping thousands 
                of citizens discover and apply for benefits that can transform their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;