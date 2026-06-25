export interface CoverLetterFormData {
  companyName: string;
  positionName: string;
  hiringManagerName: string;
  customWhyInterested: string;
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