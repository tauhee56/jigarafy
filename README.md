# StreamifyPro - Professional Video Calling Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.0+-blue.svg" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18.0+-green.svg" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-6.0+-brightgreen.svg" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0+-blue.svg" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
</div>

<div align="center">
  <h3>🚀 Enterprise-Grade Video Communication Platform</h3>
  <p>A modern, professional video calling and messaging platform built with React, Node.js, and Stream.io</p>
</div>

![Demo App](/frontend/public/screenshot-for-readme.png)

## ✨ Features

### 🎥 **Video Calling**
- **HD Video Quality** - Crystal clear 1080p video calls
- **Screen Sharing** - Share your screen with participants
- **Call Recording** - Record important meetings
- **Multi-participant** - Support for group video calls
- **Real-time Controls** - Mute, camera toggle, and more

### 💬 **Real-time Messaging**
- **Instant Messaging** - Real-time chat with typing indicators
- **File Sharing** - Share documents, images, and files
- **Message History** - Persistent chat history
- **Emoji Support** - Rich emoji and reaction support
- **Thread Conversations** - Organized message threads

### 👥 **User Management**
- **Professional Profiles** - Complete user profiles with bio and location
- **Friend System** - Connect with colleagues and partners
- **Admin Dashboard** - Comprehensive user and system management
- **Role-based Access** - Admin and user role permissions
- **User Analytics** - Track user activity and engagement

### 🎨 **Professional Design**
- **4 Professional Themes** - Light, Dark, Corporate, and Modern themes
- **Responsive Design** - Mobile-first approach with perfect mobile experience
- **Modern UI Components** - Professional component library
- **Smooth Animations** - Polished transitions and micro-interactions
- **Accessibility** - WCAG compliant design

### 🔐 **Security & Authentication**
- **JWT Authentication** - Secure token-based authentication
- **Password Encryption** - Bcrypt password hashing
- **Protected Routes** - Route-level security
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Comprehensive data validation

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and context
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Professional component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Zustand** - Lightweight state management
- **Stream React SDK** - Video calling integration

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### **Third-party Services**
- **Stream.io** - Video calling and chat infrastructure
- **Cloudinary** - Image and video management
- **MongoDB Atlas** - Cloud database hosting

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- MongoDB 6.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/streamifypro.git
   cd streamifypro
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create `.env` file in the backend directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongo_uri
   STEAM_API_KEY=your_steam_api_key
   STEAM_API_SECRET=your_steam_api_secret
   JWT_SECRET_KEY=your_jwt_secret
   NODE_ENV=development
   ```

   Create `.env` file in the frontend directory:
   ```env
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   cd backend
   npm run dev

   # Start frontend development server (from frontend directory)
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
streamifypro/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Button.jsx   # Professional button component
│   │   │   ├── Card.jsx     # Modern card component
│   │   │   ├── Input.jsx    # Enhanced input component
│   │   │   ├── Modal.jsx    # Professional modal component
│   │   │   ├── Tabs.jsx     # Tab navigation component
│   │   │   └── ...          # Other UI components
│   │   ├── pages/          # Application pages
│   │   │   ├── HomePage.jsx # Dashboard with stats
│   │   │   ├── LoginPage.jsx # Professional login
│   │   │   ├── SignUpPage.jsx # Enhanced signup
│   │   │   ├── ChatPage.jsx  # Real-time messaging
│   │   │   ├── CallPage.jsx  # Video calling interface
│   │   │   └── AdminPage.jsx # Admin dashboard
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # State management (Zustand)
│   │   ├── lib/            # Utility functions and API calls
│   │   ├── constants/      # Application constants
│   │   └── index.css       # Global styles and Tailwind config
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

## 🎨 Professional Themes

StreamifyPro comes with 4 professionally designed themes:

- **Professional Light** - Clean and modern light theme for daytime use
- **Professional Dark** - Sophisticated dark theme with excellent contrast
- **Corporate Blue** - Traditional corporate theme with deep blues
- **Modern Gradient** - Contemporary theme with vibrant gradients

## 🌟 Key Improvements Made

### **Design System Overhaul**
- ✅ Custom professional color palettes
- ✅ Advanced typography with Inter, Poppins fonts
- ✅ Smooth animations and transitions
- ✅ Professional shadows and effects

### **Enhanced Components**
- ✅ Professional Button component with variants
- ✅ Advanced Input component with validation
- ✅ Modern Card component with multiple styles
- ✅ Professional Modal and Tab components
- ✅ Enhanced loading states and animations

### **Improved User Experience**
- ✅ Mobile-responsive navigation
- ✅ Professional authentication pages
- ✅ Enhanced video calling interface
- ✅ Modern chat interface with backdrop blur
- ✅ Comprehensive admin dashboard

### **Performance & Quality**
- ✅ Optimized component rendering
- ✅ Professional loading states
- ✅ Error handling and validation
- ✅ Accessibility improvements

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Stream.io](https://getstream.io/) for video calling infrastructure
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [DaisyUI](https://daisyui.com/) for beautiful UI components
- [React](https://reactjs.org/) for the amazing frontend framework

## 📞 Support

For support, email support@streamifypro.com or join our community.

---

<div align="center">
  <p>Made with ❤️ by the StreamifyPro Team</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
