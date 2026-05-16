export type JobCategory = 'Physical' | 'Academic' | 'Delivery' | 'Digital' | 'Tutoring';

export type Job = {
  id: string;
  title: string;
  category: JobCategory;
  payType: 'Fixed Rate' | 'Per Hour';
  payAmount: number;
  posterName: string;
  posterAvatar: string; // URL or local require()
  postedAgo: string;
};