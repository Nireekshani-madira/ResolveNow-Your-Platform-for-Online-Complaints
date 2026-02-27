
/**
 * MONGODB SIMULATOR (Data Access Layer)
 * This mimics the Express + MongoDB interaction logic.
 */

import { Complaint, User, Message, ComplaintStatus, UserRole } from '../types';

const COLLECTIONS = {
  COMPLAINTS: 'mongodb_complaints',
  USERS: 'mongodb_users'
};

export const mongoDb = {
  complaints: {
    find: async (query: any = {}): Promise<Complaint[]> => {
      const data = localStorage.getItem(COLLECTIONS.COMPLAINTS);
      const docs: Complaint[] = data ? JSON.parse(data) : [];
      
      return docs.filter(doc => {
        for (let key in query) {
          if (doc[key as keyof Complaint] !== query[key]) return false;
        }
        return true;
      }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },

    findOne: async (id: string): Promise<Complaint | undefined> => {
      const docs = await mongoDb.complaints.find();
      return docs.find(d => d.id === id);
    },

    insertOne: async (doc: Complaint): Promise<Complaint> => {
      const docs = await mongoDb.complaints.find();
      docs.push(doc);
      localStorage.setItem(COLLECTIONS.COMPLAINTS, JSON.stringify(docs));
      return doc;
    },

    updateOne: async (id: string, update: Partial<Complaint>): Promise<void> => {
      const docs = await mongoDb.complaints.find();
      const index = docs.findIndex(d => d.id === id);
      if (index !== -1) {
        docs[index] = { ...docs[index], ...update };
        localStorage.setItem(COLLECTIONS.COMPLAINTS, JSON.stringify(docs));
      }
    }
  },

  users: {
    find: async (query: any = {}): Promise<(User & { password?: string })[]> => {
      const data = localStorage.getItem(COLLECTIONS.USERS);
      let docs: (User & { password?: string })[] = data ? JSON.parse(data) : [];
      
      // Seed initial admin if empty for demo purposes
      if (docs.length === 0) {
        docs = [
          { id: 'admin-1', name: 'System Admin', email: 'admin@reslovenow.com', role: UserRole.ADMIN, password: 'password123' },
          { id: 'agent-1', name: 'Sarah Miller', email: 'agent@reslovenow.com', role: UserRole.AGENT, password: 'password123' }
        ];
        localStorage.setItem(COLLECTIONS.USERS, JSON.stringify(docs));
      }

      return docs.filter(doc => {
        for (let key in query) {
          if ((doc as any)[key] !== query[key]) return false;
        }
        return true;
      });
    },

    findOne: async (query: any): Promise<(User & { password?: string }) | undefined> => {
      const users = await mongoDb.users.find(query);
      return users[0];
    },

    insertOne: async (user: User & { password?: string }): Promise<User> => {
      const docs = await mongoDb.users.find();
      docs.push(user);
      localStorage.setItem(COLLECTIONS.USERS, JSON.stringify(docs));
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
  }
};
