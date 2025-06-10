export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  targetAmount: number;
  createdAt: string;
  isActive: boolean;
}

export interface Donation {
  id: string;
  projectId: string;
  amount: number;
  mpesaReceiptNumber: string | null;
  phoneNumberHash: string | null;
  donationDate: string;
  isAnonymous: boolean;
}

export interface User {
  id: string;
  email: string;
}
