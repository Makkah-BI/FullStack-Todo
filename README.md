# Full-Stack Todo Application

A modern, production-style full-stack Todo application built with **React, TypeScript, Node.js, Express, Prisma, and PostgreSQL**.

This project demonstrates real-world software engineering concepts such as authentication, authorization, database relationships, API development, and deployment.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Logout
- Password Hashing with bcrypt

## Todo Management

- Create Todos
- View Todos
- Update Todos
- Delete Todos
- Mark Todos as Complete/Incomplete

## Priority Levels

- 🔴 High
- 🟡 Medium
- 🟢 Low

## Due Dates

- Add Due Dates
- Display Due Dates
- Dynamic Status:
  - 🔴 Overdue
  - 🟡 Today
  - 🟢 Upcoming

## User Experience

- Dark Mode
- Search Functionality
- Responsive Design
- Persistent Theme Preference

---

# Tech Stack

## Frontend

- React
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- bcrypt

## Database

- PostgreSQL
- Prisma ORM

---

# Project Architecture

Client (React)
↓
Axios API Requests
↓
Express Routes
↓
Controllers
↓
Services
↓
Prisma ORM
↓
PostgreSQL

---

# Project Structure

## Frontend

frontend/
│
├── src/
│ ├── pages/
│ │ ├── Login.tsx
│ │ ├── Register.tsx
│ │ └── Dashboard.tsx
│ │
│ ├── services/
│ │ └── api.ts
│ │
│ ├── types/
│ │ └── todo.ts
│ │
│ ├── App.tsx
│ └── main.tsx
│
└── package.json

## Backend

backend/
│
├── src/
│ ├── config/
│ │ └── prisma.ts
│ │
│ ├── controllers/
│ │ ├── authController.ts
│ │ └── todoController.ts
│ │
│ ├── middleware/
│ │ └── authMiddleware.ts
│ │
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ └── todoRoutes.ts
│ │
│ ├── services/
│ │ ├── authService.ts
│ │ └── todoService.ts
│ │
│ └── server.ts
│
├── prisma/
│ └── schema.prisma
│
└── package.json

---

# Database Schema

## User Model

prisma

# API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

---

## Todos

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | /api/todos            | Get User Todos    |
| POST   | /api/todos            | Create Todo       |
| PUT    | /api/todos/:id        | Update Todo       |
| DELETE | /api/todos/:id        | Delete Todo       |
| PATCH  | /api/todos/:id/toggle | Toggle Completion |

---

# Authentication Flow

Register
↓
Login
↓
JWT Token Generated
↓
Token Stored in localStorage
↓
Protected Requests

---

# Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- PostgreSQL
- Neon
- Supabase

---

# Concepts

- React Hooks
- TypeScript
- JWT Authentication
- REST APIs
- Prisma ORM
- PostgreSQL
- MVC Architecture
- Error Handling
- Authentication & Authorization
- Deployment
- Responsive Design

---

# Future Improvements

This project intentionally remains simple.

Potential future features:

- Categories
- Filters
- Statistics Dashboard
- Notifications
- Email Reminders
- Real-Time Updates
- Team Collaboration
- File Uploads

---

# Author

**Makkah Ismael**

Aspiring Full-Stack Developer passionate about building scalable web applications and mastering modern software engineering practices.

---

# ⭐ Support

If you found this project helpful, please consider giving it a **star** on GitHub.
