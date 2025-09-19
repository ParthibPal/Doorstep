# Doorstep - Local Service Marketplace

![Doorstep Logo](https://img.shields.io/badge/Doorstep-Local%20Services-orange?style=for-the-badge\&logo=react)

A **Local Service Marketplace** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js).
It connects customers with local service providers seamlessly.

## 🚀 Features

### For Customers

* **Service Search**: Search by category, location, or provider
* **Real-time Listings**: Browse local service providers instantly
* **User Authentication**: Secure login and registration system
* **Personal Dashboard**: Track bookings and past orders
* **Ratings & Reviews**: Check provider ratings before booking
* **Mobile Responsive**: Access from any device

### For Service Providers

* **Service Listing**: Create and manage your service offerings
* **Dashboard**: Track customer requests and bookings
* **Profile Management**: Showcase your business and services
* **Booking Management**: Accept, reject, or reschedule service requests

### For Administrators

* **User Management**: Manage all users and roles
* **Service Moderation**: Approve or remove services
* **Analytics**: Monitor platform usage and performance
* **Content Management**: Manage categories and other platform content

## 🛠️ Tech Stack

### Frontend

* **React 19** - Modern UI library
* **Vite** - Fast build tool
* **React Router DOM** - Client-side routing
* **Lucide React** - Icons
* **Framer Motion** - Smooth animations
* **CSS3** - Custom styling

### Backend

* **Node.js** - JavaScript runtime
* **Express.js** - Web framework
* **MongoDB** - NoSQL database
* **Mongoose** - MongoDB object modeling
* **JWT** - Authentication tokens
* **bcryptjs** - Password hashing
* **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Doorstep/
├── Backend/                 # Server-side code
│   ├── config/             # Database configuration
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   └── server.js           # Main server file
├── FrontEnd/               # Client-side code
│   ├── src/
│   │   ├── Components/     # Reusable components
│   │   ├── Pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── Css/            # Stylesheets
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

* Node.js (v16 or higher)
* MongoDB (local or cloud)
* Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ParthibPal/Doorstep.git
   cd Doorstep
   ```

2. **Install Backend Dependencies**

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../FrontEnd
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the Backend directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the Development Servers**

   **Backend (Terminal 1):**

   ```bash
   cd Backend
   npm run dev
   ```

   **Frontend (Terminal 2):**

   ```bash
   cd FrontEnd
   npm run dev
   ```

6. **Access the Application**

   * Frontend: [http://localhost:5173](http://localhost:5173)
   * Backend API: [http://localhost:5000](http://localhost:5000)

## 📋 Available Scripts

### Backend Scripts

```bash
npm run dev          # Start development server with nodemon
npm run dev:clean    # Kill port 5000 and start dev server
npm start            # Start production server
npm run start:clean  # Kill port 5000 and start production server
```

### Frontend Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Database Setup

1. Create a MongoDB database (local or MongoDB Atlas)
2. Update the `MONGODB_URI` in your `.env` file
3. The application will automatically create necessary collections

### Admin User Setup

Run the admin creation script:

```bash
cd Backend
node scripts/createAdmin.js
```

## 📱 Features Overview

### Homepage

* Hero section with service search
* Featured service listings
* Popular categories display
* Customer testimonials

### Authentication

* User registration and login
* JWT-based authentication
* Role-based access control
* Protected routes

### Service Management

* Create, read, update, delete services
* Booking and request tracking
* Ratings and reviews

### Admin Panel

* User management
* Service moderation
* System analytics
* Content management

## 🔒 Security Features

* Password hashing with bcryptjs
* JWT token authentication
* Input validation and sanitization
* CORS configuration
* Protected API endpoints

## 🎨 UI/UX Features

* Modern, responsive design
* Smooth animations with Framer Motion
* Intuitive navigation
* Mobile-first approach
* Loading states and error handling
* Beautiful icons with Lucide React

## 🚀 Live Demo

Check out the live version of the project here:
**[Doorstep Live](https://doorstep-2ia5.onrender.com)**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Parthib Pal**
GitHub: [@ParthibPal](https://github.com/ParthibPal)

## 🙏 Acknowledgments

* React team for the amazing framework
* MongoDB for the database solution
* Express.js for the backend framework
* All the open-source contributors whose libraries made this possible

## 📞 Support

If you have any questions or need help, open an issue on GitHub or contact the maintainer.

---

**Made with ❤️ by Parthib Pal**


Do you want me to do that?
