import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Analytics from "@/components/Analytics";
import FeaturedSchemes from "@/components/FeaturedSchemes";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Analytics />
      <FeaturedSchemes />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
