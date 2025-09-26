# Ticket Management App

A simple web application for managing support tickets with **role-based access** for Admins and Users.  

- **Admin** can view all tickets, update ticket status, and manage users.  
- **Users** can create tickets, view their own tickets, and track ticket status.

---

## Features

- User registration and login
- Admin login
- Role-based access control
- Create, read, update, delete tickets
- Ticket fields:
  - Name
  - Description
  - Priority (Low, Medium, High)
  - Status (Open, In Progress, Resolved, Closed)
- Protected routes based on user role
- Responsive UI with React and TailwindCSS
- API built with Node.js, Express, and MongoDB
- JWT-based authentication with cookies/localStorage

---

## Tech Stack

- **Frontend:** React, React Router, TailwindCSS, React Icons, react-hot-toast  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Authentication:** JWT, bcrypt  
- **Notifications:** react-hot-toast  

---

## Folder Structure

MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
ADMIN_EMAIL=admin123@gmail.com
ADMIN_PASSWORD=12345678
PORT=5000
