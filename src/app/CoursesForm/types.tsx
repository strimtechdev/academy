export interface Course {
  id: string;
  title: string;
  description: string;
  details: string[];
  duration: string;
  fee: string;
  bonus: string;
}

export interface Registration {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  state?: string;
  courseTitle: string;
  ref: string;
}
