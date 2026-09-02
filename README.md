# ConnectX 💬

ConnectX is a modern, real-time full-stack chat application built with React, Node.js, Express, Socket.io, and PostgreSQL. It features a sleek UI with dark mode support, real-time messaging, online status indicators, and WhatsApp-style read receipts.

## ✨ Features

- **Real-Time Messaging**: Send and receive messages instantly using WebSockets (Socket.io).
- **Authentication**: Secure user login and registration using JWT and bcrypt.
- **Read & Delivered Receipts**: WhatsApp-style message statuses (Single gray tick for sent, double gray ticks for delivered, double blue ticks for read).
- **Online & Last Active Status**: See who is currently online or exactly when they were last active.
- **Typing Indicators**: Real-time feedback when the other user is typing.
- **Dark Mode Support**: Beautifully crafted dark mode integrated with Tailwind CSS.
- **Responsive UI**: Built with Tailwind CSS and DaisyUI for a seamless experience on both desktop and mobile devices.

## 🛠️ Tech Stack

**Frontend:**
- React (React Router, Hooks)
- Redux Toolkit (State Management)
- Tailwind CSS & DaisyUI (Styling)
- Socket.io-client (Real-time events)
- Axios (HTTP requests)

**Backend:**
- Node.js & Express.js
- Socket.io (WebSocket server)
- PostgreSQL (Database)
- Drizzle ORM (Database interaction)
- JSON Web Tokens (Authentication)
- Bcrypt (Password hashing)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/QuickConnect.git
   cd ConnectX
   ```

2. **Setup the Backend:**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory with the following variables:
   ```env
   PORT=8080
   DATABASE_URL=your_postgresql_database_url
   JWT_SECRET=your_jwt_secret_key
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup the Frontend:**
   Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
   Start the React development server:
   ```bash
   npm start
   ```

## 🗄️ Database Schema

The PostgreSQL database uses the following core entities managed via Drizzle ORM:
- **Users**: Stores user profiles, hashed passwords, avatars, and `lastActive` timestamps.
- **Messages**: Stores message content, sender/receiver IDs, and `status` (sent, delivered, read).
- **Conversations**: Tracks conversation threads and associated message IDs between participants.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/your-username/ConnectX/issues).

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
