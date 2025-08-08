import { TProject } from '../Project/project.interface';

export interface TClient {
  name: string;
  email: string;
  userEmail: string;
  phone: string;
  company?: string;
  notes?: string;
  projects?: TProject[];
}
