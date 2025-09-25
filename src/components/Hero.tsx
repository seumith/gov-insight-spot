import { Button } from "@/components/ui/button";
import { ArrowRight, Search, FileText, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            {t("hero_title_1")}
            <span className="block text-accent mt-2">{t("hero_title_2")}</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="group" onClick={() => navigate("/browse-schemes")}>
              {t("hero_browse")}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
              onClick={() => window.dispatchEvent(new Event("open-search"))}
            >
              <Search className="mr-2 w-4 h-4" />
              {t("hero_find")}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-accent mr-2" />
                <span className="text-2xl font-bold text-primary-foreground">500+</span>
              </div>
              <p className="text-primary-foreground/80">Active Schemes</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-accent mr-2" />
                <span className="text-2xl font-bold text-primary-foreground">2M+</span>
              </div>
              <p className="text-primary-foreground/80">Citizens Helped</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-accent mr-2">₹</span>
                <span className="text-2xl font-bold text-primary-foreground">100Cr+</span>
              </div>
              <p className="text-primary-foreground/80">Benefits Distributed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;