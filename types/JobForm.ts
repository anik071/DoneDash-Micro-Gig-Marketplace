import { JobCategory } from './job';

export type JobForm = {
  title: string;
  description: string;
  category: JobCategory | null;
  deadline: Date | null;
  location: string;
  pay: string;
  images: string[]; // local URIs
};