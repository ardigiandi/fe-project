export interface Collaborators {
  _id: string;
  name: string;
  email: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: string;
  tags: string[];
  collaborators: Collaborators[];
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  totalJobsCount: number;
  completedJobsCount: number;
  percencetageCompleted: number;
}

export interface Invitation {
  _id: string;
  status: string;
  receiver: {
    _id: string;
    name: string;
    email: string;
  };
  sender: {
    _id: string;
    name: string;
    email: string;
  };
  project: {
    title: string;
    description: string;
    dueDate: string;
  };
  createdAt: string;
}
