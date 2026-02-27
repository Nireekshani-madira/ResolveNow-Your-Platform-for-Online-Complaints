# 🛡️ ComplaintCare: AI-Powered Enterprise Resolution Platform

**ComplaintCare** is a sophisticated, full-cycle complaint management system designed to bridge the gap between consumers and support teams. By leveraging AI-driven insights and a modern, role-based architecture, it ensures every grievance is tracked, analyzed, and resolved efficiently.

## ✨ Key Features

- **🤖 AI-Powered Intelligence**: Integrates Google Gemini API to automatically generate concise summaries of complex complaints and suggest professional resolution paths for agents.
- **👥 Role-Based Access Control (RBAC)**:
  - **Consumers**: Submit detailed complaints, track status in real-time, and chat with assigned agents.
  - **Agents**: Manage assigned tickets, update resolution progress, and communicate directly with users.
  - **Admins**: Full oversight of the system, including agent assignment and high-level analytics.
- **💬 Real-Time Interaction**: A built-in messaging interface within each complaint detail view allows for seamless clarification and updates.
- **📊 Dynamic Dashboard**: Scoped views for each user role to monitor pending, in-progress, and resolved cases at a glance.
- **🎨 Crafted UI/UX**: A clean, professional interface built with **Tailwind CSS** and **Motion** for smooth, intuitive transitions.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Google Gemini API (@google/genai)](https://ai.google.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Motion](https://motion.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Google Gemini API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/complaint-care.git
   cd complaint-care
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/src/components`: Reusable UI components (Dashboard, Detail views, etc.)
- `/src/services`: API simulation and Gemini AI integration logic.
- `/src/types.ts`: Centralized TypeScript interfaces for Users, Complaints, and Messages.
- `/src/App.tsx`: Main routing and global state management.

## 🔒 Security & Compliance

- **Protected Routes**: Ensures users can only access data relevant to their role.
- **Secure Handling**: Designed with enterprise-grade data structures for complaint tracking.

---

*Developed with a focus on transparency, efficiency, and modern AI integration.*
