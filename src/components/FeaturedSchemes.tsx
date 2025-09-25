import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Home, Briefcase, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageProvider";
import { schemes as dataSchemes } from "@/data/schemes";
import BookmarkButton from "@/components/BookmarkButton";

const schemes = [
  {
    id: 1,
    targetId: "pm-kisan-samman-nidhi",
    title: "PM-KISAN Samman Nidhi",
    description: "Direct income support of ₹6000 per year to small and marginal farmers across the country.",
    category: "Agriculture",
    beneficiaries: "12 Crore+",
    amount: "₹6,000/year",
    icon: Users,
    status: "Active"
  },
  {
    id: 2,
    targetId: "ayushman-bharat",
    title: "Ayushman Bharat",
    description: "Health insurance scheme providing coverage up to ₹5 lakh per family per year.",
    category: "Healthcare",
    beneficiaries: "50 Crore+",
    amount: "₹5 Lakh coverage",
    icon: Heart,
    status: "Active"
  },
  {
    id: 3,
    targetId: "pradhan-mantri-awas-yojana",
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing scheme for economically weaker sections and low-income groups.",
    category: "Housing",
    beneficiaries: "1.2 Crore+",
    amount: "₹2.5 Lakh subsidy",
    icon: Home,
    status: "Active"
  },
  {
    id: 4,
    targetId: "national-scholarship-portal",
    title: "National Scholarship Portal",
    description: "Scholarships for students from pre-matric to post-graduation levels.",
    category: "Education",
    beneficiaries: "5 Crore+",
    amount: "Various amounts",
    icon: GraduationCap,
    status: "Active"
  },
  {
    id: 5,
    targetId: "mudra-yojana",
    title: "Mudra Yojana",
    description: "Micro-finance scheme providing loans up to ₹10 lakh for small businesses.",
    category: "Employment",
    beneficiaries: "30 Crore+",
    amount: "Up to ₹10 Lakh",
    icon: Briefcase,
    status: "Active"
  },
  {
    id: 6,
    targetId: "jan-aushadhi-scheme",
    title: "Jan Aushadhi Scheme",
    description: "Affordable generic medicines through dedicated Jan Aushadhi stores.",
    category: "Healthcare",
    beneficiaries: "All Citizens",
    amount: "60-90% savings",
    icon: Heart,
    status: "Active"
  }
];

const FeaturedSchemes = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const handleLearnMore = (targetId: string | undefined) => {
    if (targetId) {
      navigate(`/scheme/${targetId}`);
      return;
    }
    navigate("/browse-schemes");
  };
  return (
    <section className="py-16 lg:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("featured_title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("featured_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {schemes.map((scheme) => {
            const IconComponent = scheme.icon;
            return (
              <Card key={scheme.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{scheme.status}</Badge>
                      <BookmarkButton schemeId={scheme.targetId} size="sm" />
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {scheme.title}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {scheme.category}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {scheme.description}
                  </CardDescription>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{t("featured_beneficiaries")}</span>
                      <span className="font-semibold text-primary">{scheme.beneficiaries}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{t("featured_benefit")}</span>
                      <span className="font-semibold text-secondary">{scheme.amount}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full group/btn" onClick={() => handleLearnMore((scheme as any).targetId)}>
                    {t("featured_learn_more")}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="group" onClick={() => navigate("/browse-schemes")}>
            {t("featured_view_all")}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSchemes;