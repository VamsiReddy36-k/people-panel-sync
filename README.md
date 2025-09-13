# 🎯 User Management Dashboard

A modern, full-featured User Management Dashboard built with React.js and TypeScript. This application provides a beautiful interface for managing users with complete CRUD operations, search functionality, and responsive design.

## ✨ Features

### 📊 Dashboard
- **User Cards Layout**: Clean, modern card-based user display
- **Real-time Search**: Filter users by name, email, or company
- **Responsive Design**: Mobile-first design that works on all devices
- **User Statistics**: Live user count and analytics

### 👤 User Management
- **Create Users**: Comprehensive form with client-side validation
- **View Details**: Detailed user profiles with all information
- **Edit Users**: Update user information (feature ready)
- **Delete Users**: Remove users with confirmation

### 🎨 Design System
- **Modern UI**: Beautiful gradient-based design with smooth animations
- **Dark Theme**: Professional dark theme with purple/blue accents
- **Semantic Tokens**: Consistent design system using CSS custom properties
- **Smooth Transitions**: Micro-interactions and hover effects

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Context API**: Global state management for user data
- **React Router**: Client-side routing for SPA experience
- **Form Validation**: Client-side validation with error handling
- **Mock API**: Simulated backend with async operations
- **Error Handling**: Graceful error states and loading indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd user-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components

### State Management
- **React Context API** - Global state management
- **useReducer** - Complex state logic
- **Custom Hooks** - Reusable state logic

### Routing
- **React Router DOM** - Client-side routing
- **Nested Routes** - Organized route structure

### UI/UX
- **Lucide React** - Beautiful icons
- **CSS Custom Properties** - Design system tokens
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── UserCard.tsx    # User display card
│   └── CreateUserModal.tsx # User creation form
├── context/            # React Context providers
│   └── UserContext.tsx # User state management
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard page
│   ├── UserDetails.tsx # User detail page
│   └── NotFound.tsx    # 404 page
├── types/              # TypeScript type definitions
│   └── user.ts         # User interface types
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## 🎨 Design System

The application uses a carefully crafted design system with:

- **Color Palette**: Purple/blue gradient theme with professional dark colors
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Shadows**: Subtle shadows and glows for depth
- **Animations**: Smooth transitions and micro-interactions

### Key Design Tokens
```css
--primary: 258 90% 66%          /* Purple primary color */
--gradient-primary: linear-gradient(135deg, hsl(258 90% 66%), hsl(266 85% 58%))
--shadow-primary: 0 10px 40px -10px hsl(258 90% 66% / 0.3)
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

## 📱 Features Overview

### Dashboard Page (`/`)
- Display all users in a responsive grid layout
- Search functionality with real-time filtering
- User statistics and metrics
- Quick actions for each user (view, edit, delete)
- Empty state when no users exist
- Loading states and error handling

### User Details Page (`/users/:id`)
- Complete user information display
- Organized sections for different data types
- Quick action buttons for common tasks
- Navigation back to dashboard
- Responsive layout for all screen sizes

### Create User Modal
- Comprehensive form with validation
- Required field indicators
- Real-time error display
- Organized sections for better UX
- Responsive form layout

## 🔧 API Simulation

The application includes a complete mock API system that simulates:

- **GET /users** - Fetch all users
- **GET /users/:id** - Fetch single user
- **POST /users** - Create new user
- **PUT /users/:id** - Update user
- **DELETE /users/:id** - Delete user

All operations include realistic loading times and error handling.

## 🎯 Future Enhancements

### Backend Integration
- Replace mock API with real backend
- Add authentication and authorization
- Implement user roles and permissions
- Add data persistence

### Additional Features
- User profile pictures/avatars
- Advanced filtering and sorting
- Bulk operations
- Export functionality
- User activity logs
- Email integration

### Performance
- Virtual scrolling for large datasets
- Image optimization
- Code splitting
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon library
- [React](https://reactjs.org/) for the amazing framework

---

Built with ❤️ for the Full-Stack Developer Intern Assignment