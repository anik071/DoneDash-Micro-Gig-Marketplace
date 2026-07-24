export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  role: "helper" | "poster";

  bio: string | null;
  phone: string | null;
  location: string | null;

  university: string | null;
  department: string | null;

  completed_jobs: number;
  total_earnings: number;
  average_rating: number;
}
