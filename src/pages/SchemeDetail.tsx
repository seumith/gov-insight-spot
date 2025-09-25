import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle, 
  Phone, 
  Mail, 
  Globe,
  TrendingUp,
  Clock,
  MapPin,
  ArrowLeft
} from "lucide-react";
import { getSchemeBySlug } from "@/data/schemes";
import { useState } from "react";

const SchemeDetail = () => {
  const { schemeName } = useParams<{ schemeName: string }>();
  const [isLiked, setIsLiked] = useState(false);
  
  const scheme = schemeName ? getSchemeBySlug(schemeName) : undefined;

  if (!scheme) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Scheme Not Found</h1>
          <p className="text-muted-foreground mb-8">The scheme you're looking for doesn't exist.</p>
          <Link to="/browse-schemes">
            <Button>Browse All Schemes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/browse-schemes" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse Schemes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge variant="secondary">{scheme.category}</Badge>
                    <CardTitle className="text-2xl md:text-3xl">{scheme.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={isLiked ? "text-red-500 border-red-200" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                      {(scheme.likes + (isLiked ? 1 : 0)).toLocaleString()}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {scheme.comments}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-lg leading-relaxed">
                  {scheme.description}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Full Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  About This Scheme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{scheme.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scheme.eligibility.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scheme.documentsRequired.map((document, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                      <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{document}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  How to Apply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheme.applicationProcess.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="pt-1">
                        <p>{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Beneficiaries
                    </span>
                    <span className="font-semibold text-primary">{scheme.beneficiaries}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Benefit Amount</span>
                    <span className="font-semibold text-secondary">{scheme.benefitAmount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Validity
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {scheme.validity.includes("Ongoing") ? "Active" : "Limited"}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className="text-sm text-right">{scheme.applicationDeadline}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Scheme Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Total Applications</span>
                      <span className="text-sm font-semibold">{scheme.analytics.totalApplications.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Approval Rate</span>
                      <span className="text-sm font-semibold text-green-600">{scheme.analytics.approvalRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${scheme.analytics.approvalRate}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Processing Time
                    </span>
                    <span className="text-sm font-semibold">{scheme.analytics.averageProcessingTime}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Top States
                  </h4>
                  <div className="space-y-1">
                    {scheme.analytics.topStates.map((state, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="w-4 text-xs text-muted-foreground">{index + 1}.</span>
                        <span>{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{scheme.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{scheme.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={scheme.contactInfo.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Official Website
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SchemeDetail;