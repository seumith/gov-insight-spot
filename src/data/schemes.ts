export interface Scheme {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  likes: number;
  comments: number;
  validity: string;
  criteria: string[];
  benefitAmount: string;
  beneficiaries: string;
  applicationDeadline: string;
  documentsRequired: string[];
  applicationProcess: string[];
  eligibility: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  analytics: {
    totalApplications: number;
    approvalRate: number;
    averageProcessingTime: string;
    topStates: string[];
  };
}

export const schemes: Scheme[] = [
  {
    id: "pm-kisan-samman-nidhi",
    title: "PM-KISAN Samman Nidhi",
    description: "Direct income support of ₹6000 per year to small and marginal farmers across the country.",
    fullDescription: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme launched on 24th February 2019. Under this scheme, income support of Rs. 6000 per year is provided to all farmer families across the country in three equal installments of Rs. 2000 each, every four months.",
    category: "Agriculture",
    likes: 45670,
    comments: 2340,
    validity: "Ongoing (No End Date)",
    criteria: ["Small and marginal farmers", "Landholding up to 2 hectares", "Must be cultivator or owner of land"],
    benefitAmount: "₹6,000 per year",
    beneficiaries: "12 Crore+",
    applicationDeadline: "No deadline - Open throughout year",
    documentsRequired: [
      "Land ownership document",
      "Aadhaar card",
      "Bank account details",
      "Mobile number"
    ],
    applicationProcess: [
      "Visit PM-KISAN portal or CSC center",
      "Fill registration form with required details",
      "Upload necessary documents",
      "Submit application for verification",
      "Receive confirmation and farmer ID"
    ],
    eligibility: [
      "Should be a farmer family",
      "Landholding should not exceed 2 hectares",
      "Must have cultivable land",
      "Valid Aadhaar card required"
    ],
    contactInfo: {
      phone: "155261",
      email: "pmkisan-ict@gov.in",
      website: "https://pmkisan.gov.in"
    },
    analytics: {
      totalApplications: 125000000,
      approvalRate: 85,
      averageProcessingTime: "30 days",
      topStates: ["Uttar Pradesh", "Bihar", "Madhya Pradesh", "West Bengal"]
    }
  },
  {
    id: "ayushman-bharat",
    title: "Ayushman Bharat (PM-JAY)",
    description: "Health insurance scheme providing coverage up to ₹5 lakh per family per year for secondary and tertiary healthcare.",
    fullDescription: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY) is the largest health insurance scheme in the world which aims at providing a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization to over 10.74 crores poor and vulnerable families.",
    category: "Healthcare",
    likes: 67890,
    comments: 4567,
    validity: "Ongoing (No End Date)",
    criteria: ["Below Poverty Line families", "As per SECC 2011 database", "Rural and urban poor families"],
    benefitAmount: "₹5 Lakh coverage per family per year",
    beneficiaries: "50 Crore+",
    applicationDeadline: "No deadline - Open throughout year",
    documentsRequired: [
      "Aadhaar card",
      "Ration card",
      "SECC verification document",
      "Mobile number"
    ],
    applicationProcess: [
      "Check eligibility on AB PM-JAY portal",
      "Visit nearest CSC or empanelled hospital",
      "Provide required documents for verification",
      "Generate Ayushman card",
      "Start availing cashless treatment"
    ],
    eligibility: [
      "Must be part of SECC 2011 database",
      "Below Poverty Line families",
      "Valid Aadhaar card required",
      "Resident of India"
    ],
    contactInfo: {
      phone: "14555",
      email: "info@pmjay.gov.in",
      website: "https://pmjay.gov.in"
    },
    analytics: {
      totalApplications: 500000000,
      approvalRate: 78,
      averageProcessingTime: "15 days",
      topStates: ["Gujarat", "Chhattisgarh", "Kerala", "Punjab"]
    }
  },
  {
    id: "pradhan-mantri-awas-yojana",
    title: "Pradhan Mantri Awas Yojana",
    description: "Housing scheme providing financial assistance for construction/purchase of houses for economically weaker sections.",
    fullDescription: "Pradhan Mantri Awas Yojana (Urban) aims to provide pucca houses to all eligible urban families by the year 2022. The scheme provides central assistance to Urban Local Bodies (ULBs) and other implementing agencies through States/UTs for providing houses to all eligible families/beneficiaries.",
    category: "Housing",
    likes: 34560,
    comments: 1890,
    validity: "Till March 2024 (Extended)",
    criteria: ["EWS, LIG, MIG categories", "Must not own pucca house", "Adult woman member in family"],
    benefitAmount: "₹2.5 Lakh subsidy (varies by category)",
    beneficiaries: "1.2 Crore+",
    applicationDeadline: "March 31, 2024",
    documentsRequired: [
      "Income certificate",
      "Property documents",
      "Aadhaar card",
      "Bank account details",
      "Passport size photographs"
    ],
    applicationProcess: [
      "Visit PMAY-U portal",
      "Select appropriate component",
      "Fill online application form",
      "Upload required documents",
      "Submit and track application status"
    ],
    eligibility: [
      "Family should not own pucca house in India",
      "Income criteria as per EWS/LIG/MIG category",
      "Adult woman member should be co-owner",
      "Should not have availed central assistance under any housing scheme"
    ],
    contactInfo: {
      phone: "011-23062686",
      email: "hfa-mohua@gov.in",
      website: "https://pmaymis.gov.in"
    },
    analytics: {
      totalApplications: 12000000,
      approvalRate: 72,
      averageProcessingTime: "90 days",
      topStates: ["Maharashtra", "Uttar Pradesh", "Karnataka", "Gujarat"]
    }
  },
  {
    id: "national-scholarship-portal",
    title: "National Scholarship Portal",
    description: "Comprehensive scholarship schemes for students from pre-matric to post-graduation levels across various categories.",
    fullDescription: "The National Scholarship Portal (NSP) is a one-stop solution through which various services starting from student application, application receipt, processing, sanction and disbursal of various scholarships to Students are facilitated.",
    category: "Education",
    likes: 89234,
    comments: 6789,
    validity: "Application opens annually",
    criteria: ["Students from various categories", "Merit and means-based", "Different eligibility for each scheme"],
    benefitAmount: "Various amounts (₹1,200 to ₹2,00,000)",
    beneficiaries: "5 Crore+",
    applicationDeadline: "Varies by scheme (Usually Oct-Dec)",
    documentsRequired: [
      "Mark sheets/certificates",
      "Income certificate",
      "Caste certificate (if applicable)",
      "Bank account details",
      "Aadhaar card"
    ],
    applicationProcess: [
      "Register on NSP portal",
      "Fill scholarship application form",
      "Upload required documents",
      "Submit application before deadline",
      "Track application status regularly"
    ],
    eligibility: [
      "Enrolled in recognized institution",
      "Meet income criteria",
      "Minimum percentage requirements",
      "Indian citizenship required"
    ],
    contactInfo: {
      phone: "0120-6619540",
      email: "helpdesk@nsp.gov.in",
      website: "https://scholarships.gov.in"
    },
    analytics: {
      totalApplications: 50000000,
      approvalRate: 65,
      averageProcessingTime: "60 days",
      topStates: ["Uttar Pradesh", "Bihar", "West Bengal", "Odisha"]
    }
  },
  {
    id: "mudra-yojana",
    title: "Pradhan Mantri MUDRA Yojana",
    description: "Micro-finance scheme providing collateral-free loans up to ₹10 lakh for small businesses and entrepreneurs.",
    fullDescription: "Pradhan Mantri MUDRA Yojana (PMMY) is a scheme launched by Hon'ble Prime Minister on April 8, 2015 for providing loans up to 10 lakh to the non-corporate, non-farm small/micro enterprises.",
    category: "Employment",
    likes: 56789,
    comments: 3456,
    validity: "Ongoing (No End Date)",
    criteria: ["Non-corporate, non-farm enterprises", "Business loan requirement up to ₹10 lakh", "Viable business plan"],
    benefitAmount: "Up to ₹10 Lakh loan",
    beneficiaries: "30 Crore+",
    applicationDeadline: "No deadline - Open throughout year",
    documentsRequired: [
      "Identity proof",
      "Address proof",
      "Business plan",
      "Bank statements",
      "Project report"
    ],
    applicationProcess: [
      "Approach any bank/NBFC/MFI",
      "Submit loan application with documents",
      "Bank evaluates business proposal",
      "Loan sanctioned based on assessment",
      "Loan amount disbursed to account"
    ],
    eligibility: [
      "Indian citizen",
      "Non-defaulter to any bank/financial institution",
      "Viable business activity",
      "Age: 18 years and above"
    ],
    contactInfo: {
      phone: "1800-180-1111",
      email: "mudra.help@sidbi.in",
      website: "https://mudra.org.in"
    },
    analytics: {
      totalApplications: 300000000,
      approvalRate: 83,
      averageProcessingTime: "45 days",
      topStates: ["Tamil Nadu", "Karnataka", "Uttar Pradesh", "West Bengal"]
    }
  },
  {
    id: "jan-aushadhi-scheme",
    title: "Pradhan Mantri Bharatiya Jan Aushadhi Pariyojana",
    description: "Affordable generic medicines scheme through dedicated Jan Aushadhi stores across the country.",
    fullDescription: "Pradhan Mantri Bharatiya Jan Aushadhi Pariyojana (PMBJP) is a campaign launched by the Department of Pharmaceuticals to provide quality medicines at affordable prices to all through exclusive outlets 'Pradhan Mantri Bharatiya Jan Aushadhi Kendras'.",
    category: "Healthcare",
    likes: 23456,
    comments: 1234,
    validity: "Ongoing (No End Date)",
    criteria: ["Open to all citizens", "No income criteria", "Available at Jan Aushadhi stores"],
    benefitAmount: "60-90% savings on medicine costs",
    beneficiaries: "All Citizens",
    applicationDeadline: "Not applicable - Direct purchase",
    documentsRequired: [
      "Doctor's prescription",
      "Valid ID proof"
    ],
    applicationProcess: [
      "Visit nearest Jan Aushadhi Kendra",
      "Show doctor's prescription",
      "Purchase required generic medicines",
      "Pay discounted prices",
      "Get quality medicines at affordable rates"
    ],
    eligibility: [
      "All Indian citizens eligible",
      "Valid prescription required",
      "No age or income restrictions"
    ],
    contactInfo: {
      phone: "011-49431800",
      email: "janaushadhi@gmail.com",
      website: "https://janaushadhi.gov.in"
    },
    analytics: {
      totalApplications: 0, // Not applicable for this scheme
      approvalRate: 100, // Direct purchase
      averageProcessingTime: "Immediate",
      topStates: ["Uttar Pradesh", "Maharashtra", "Rajasthan", "Madhya Pradesh"]
    }
  }
];

export const categories = [
  "All",
  "Agriculture", 
  "Healthcare", 
  "Housing", 
  "Education", 
  "Employment"
];

export const getSchemeBySlug = (slug: string): Scheme | undefined => {
  return schemes.find(scheme => scheme.id === slug);
};

export const getSchemesByCategory = (category: string): Scheme[] => {
  if (category === "All") return schemes;
  return schemes.filter(scheme => scheme.category === category);
};

export const getPopularSchemes = (): Scheme[] => {
  return schemes.sort((a, b) => b.likes - a.likes);
};