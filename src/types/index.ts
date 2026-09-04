export interface CoverLetterFormData {
  recruiterEmail?: string;
  emailSubject?: string;
  companyName: string;
  positionName: string;
  hiringManagerName: string;
  customWhyInterested: string;
  expectedSalary?: string;
  senderName: string;
  currentWorkplace: string;
  currentDesignation: string;
}

export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  badgeColor: string;
  generate: (data: CoverLetterFormData) => string;
}