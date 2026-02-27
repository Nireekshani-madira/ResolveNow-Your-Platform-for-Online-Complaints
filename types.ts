
export enum UserRole {
  USER = 'USER',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN'
}

export enum ComplaintStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  ASSIGNED = 'Assigned',
  RESOLVED = 'Resolved'
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  category: string;
  description: string;
  address: string;
  productDate: string;
  status: ComplaintStatus;
  assignedAgentId?: string;
  assignedAgentName?: string;
  messages: Message[];
  createdAt: string;
  aiSummary?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
