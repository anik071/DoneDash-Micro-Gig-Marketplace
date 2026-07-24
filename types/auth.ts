export type Role = "poster" | "helper";

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface SignUpErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
