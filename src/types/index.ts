export interface QuoteItem {
  id: string;
  exactText: string;
  authorNote?: string;
  postId: number;
  postUrl: string;
  date: string;
  theme: string;
  targetSection: 'hero' | 'quotes_animation' | 'interactive_notes' | 'about';
}

export interface PhotoItem {
  filename: string;
  url: string;
  postId: number;
  postUrl: string;
  role: 'hero' | 'about' | 'notes' | 'atmosphere';
  caption?: string;
  orientation: 'portrait' | 'landscape' | 'square';
}

export interface JournalNote {
  id: string;
  title: string;
  excerpt: string;
  fullText: string;
  date: string;
  postId: number;
  postUrl: string;
  photos: string[];
  category: string;
  readTime: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProblemArea {
  id: string;
  number: string;
  title: string;
  description: string;
  symptoms: string[];
  solution: string;
}

export interface ProfileInfo {
  name: string;
  surname?: string;
  fullName?: string;
  displayName: string;
  tagline: string;
  title: string;
  channelName: string;
  channelHandle: string;
  channelUrl: string;
  bookingTelegram: string;
  instagramHandle: string;
  price: number;
  currency: string;
  durationMinutes: number;
  platform: string;
  education: {
    year: string;
    institution: string;
    specialty: string;
    hours?: string;
  }[];
  associations: string[];
  principles: string[];
  rules: {
    reschedule: string;
    confidentiality: string;
    frequency: string;
  };
}
