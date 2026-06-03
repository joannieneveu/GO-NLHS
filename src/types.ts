export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  phone?: string;
  category?: 'medical' | 'support' | 'nurse' | 'pharmacy';
}

export interface Diagnosis {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  management: string[];
  recovery: string;
}

export interface ClinicalTrial {
  name: string;
  description: string;
  status: string;
  details?: string;
  targetDiagnosis: string[];
  bmiConstraint?: boolean;
  phase?: string;
  trialNumber?: string;
  briefLayTitle?: string;
  indication?: string;
  inclusionCriteria?: string[];
  exclusionCriteria?: string[];
  studyScheme?: {
    arms: { name: string; description: string; ratio?: string; text?: string }[];
    endpoints: string[];
    stratification?: string[];
    details?: string;
  };
  simpleExplanation?: {
    whatIsIt: string;
    howItWorksText: string;
    bulletSteps: string[];
  };
}

export interface StoryOfHope {
  id: number;
  title: string;
  text: string;
  author: string;
  flowersCount: number;
  date: string;
  diagnosis?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'surgery' | 'visit' | 'recovery';
}

export interface AdminContact {
  name: string;
  role: string;
  phone: string;
}
