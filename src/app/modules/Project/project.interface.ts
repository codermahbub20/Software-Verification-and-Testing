export interface TProject {
  title: string;
  budget: number;
  userEmail: string;
  deadline: Date;
  status: 'Ongoing' | 'Completed' | 'Pending';
  clientId?: string;
  name?: string; // Optional field for project name
  description?: string;
  id?:string // Optional field for project description
}
