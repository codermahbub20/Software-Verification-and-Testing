export interface TProject {
  title: string;
  budget: number;
  userEmail: string;
  deadline: Date;
  status: 'Ongoing' | 'Completed' | 'Pending';
  clientId?: string;
}
