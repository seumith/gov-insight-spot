import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, FileText, MapPin, Calendar, DollarSign } from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      title: "Total Applications",
      value: "2.5M+",
      growth: "+12.5%",
      icon: FileText,
      description: "Applications processed this year"
    },
    {
      title: "Active Beneficiaries", 
      value: "1.8M+",
      growth: "+8.3%",
      icon: Users,
      description: "Citizens actively receiving benefits"
    },
    {
      title: "Scheme Coverage",
      value: "95%",
      growth: "+5.2%",
      icon: MapPin,
      description: "Districts covered nationwide"
    },
    {
      title: "Success Rate",
      value: "87.2%",
      growth: "+3.1%",
      icon: TrendingUp,
      description: "Application approval rate"
    },
    {
      title: "Average Processing",
      value: "7 days",
      growth: "-2 days",
      icon: Calendar,
      description: "Time for application processing"
    },
    {
      title: "Benefits Disbursed",
      value: "₹125Cr+",
      growth: "+18.7%",
      icon: DollarSign,
      description: "Total amount distributed"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Platform Analytics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into government scheme performance and citizen engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isPositiveGrowth = !stat.growth.startsWith('-');
            
            return (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className={`flex items-center text-sm font-medium ${
                      isPositiveGrowth ? 'text-secondary' : 'text-orange-600'
                    }`}>
                      <TrendingUp className={`w-3 h-3 mr-1 ${
                        !isPositiveGrowth ? 'rotate-180' : ''
                      }`} />
                      {stat.growth}
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional insights */}
        <div className="bg-gradient-subtle rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Making Government Schemes Accessible
            </h3>
            <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our platform has simplified access to government benefits, reducing paperwork by 60% 
              and improving application success rates across all states and union territories.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">28</div>
                <div className="text-sm text-muted-foreground">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">8</div>
                <div className="text-sm text-muted-foreground">Union Territories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">15</div>
                <div className="text-sm text-muted-foreground">Languages Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;