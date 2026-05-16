export type Proposal = {
  id: string;
  name: string;
  avatarUri: string;
  rating: number;
  reviewCount: number;
  proposedPay: number;
  coverLetter: string;
};

export const DUMMY_PROPOSALS: Proposal[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatarUri: 'https://i.pravatar.cc/150?img=47',
    rating: 4.9,
    reviewCount: 42,
    proposedPay: 1800,
    coverLetter: "Hi! I'm a senior graphic design student with 3 years of freelance experience. I can deliver your logo concepts within 24 hours and provide unlimited revisions until you're 100% satisfied with the result.",
  },
  {
    id: '2',
    name: 'James Miller',
    avatarUri: 'https://i.pravatar.cc/150?img=33',
    rating: 4.7,
    reviewCount: 18,
    proposedPay: 1500,
    coverLetter: "Hey there! I specialize in clean, minimalist branding. I can definitely help you with this project. I'm available to start immediately and can provide high-quality vector files for all platforms.",
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    avatarUri: 'https://i.pravatar.cc/150?img=23',
    rating: 5.0,
    reviewCount: 5,
    proposedPay: 2200,
    coverLetter: "I am a professional illustrator and designer. My rate is slightly higher because I provide custom hand-drawn elements that make your brand stand out. I guarantee a unique look that isn't templated.",
  },
];

export type MyJob = {
  id: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  pay: number;
  posterName: string;
  posterAvatar: string;
  dueDate: string;
};

export const DUMMY_MY_JOBS: MyJob[] = [
  {
    id: '1',
    title: 'Calculus tutor – 1 hour',
    category: 'Tutoring',
    status: 'In Progress',
    pay: 350,
    posterName: 'Sara K.',
    posterAvatar: 'https://i.pravatar.cc/150?img=9',
    dueDate: 'Today, 4PM',
  },
  {
    id: '2',
    title: 'Print and deliver assignment',
    category: 'Delivery',
    status: 'Pending',
    pay: 150,
    posterName: 'Nabil H.',
    posterAvatar: 'https://i.pravatar.cc/150?img=15',
    dueDate: 'Tomorrow, 10AM',
  },
  {
    id: '3',
    title: 'Help move dorm stuff',
    category: 'Physical',
    status: 'Completed',
    pay: 500,
    posterName: 'Rahul M.',
    posterAvatar: 'https://i.pravatar.cc/150?img=12',
    dueDate: 'May 14',
  },
];