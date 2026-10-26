# Online Assessment Platform

An AI-powered online assessment platform for creating quizzes, practicing concepts, and tracking learning progress. The project is organized as a React frontend and an Express/MongoDB backend.

[Live Link](https://online-assessment-platform-nu.vercel.app/) : You can access and give the reviews

## Overview

The platform is designed to let learners:

- Create an account and sign in securely
- Generate quizzes from a topic with difficulty and timing preferences
- Complete timed assessments and save answers
- Review scores and monitor quiz history
- Manage their profile and password
- Recover access through email-based password reset

The frontend currently provides the public landing page and authentication flows. The backend includes the authentication and profile APIs, as well as MongoDB models for quizzes and assessment attempts that support the next stage of development.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT authentication stored in HTTP cookies
- bcrypt password hashing
- Nodemailer for email notifications
- dotenv for environment configuration

## Current Features

- User registration and login
- Cookie-based session authentication
- Logout
- Protected profile retrieval and profile updates
- Password change for authenticated users
- Forgot-password email flow
- Password reset using a signed token
- User roles (`USER` and `ADMIN`)
- Quiz and attempt data models with difficulty, timers, answers, scores, and completion status

## API Routes

The backend runs under the `/api` prefix.

| Method | Endpoint                          | Description                                 |
| ------ | --------------------------------- | ------------------------------------------- |
| `POST` | `/api/auth/signup`                | Create a user account                       |
| `POST` | `/api/auth/login`                 | Authenticate a user and set the auth cookie |
| `POST` | `/api/auth/logout`                | Clear the auth cookie                       |
| `POST` | `/api/auth/forgot-password`       | Send a password reset email                 |
| `POST` | `/api/auth/reset-password/:token` | Set a new password using a reset token      |
| `GET`  | `/api/user/profile`               | Get the authenticated user's profile        |
| `PUT`  | `/api/user/profile`               | Update basic profile information            |
| `PUT`  | `/api/user/change-password`       | Change the authenticated user's password    |

## Project Structure

```text
.
├── backend/
│   ├── server.js
│   └── src/
│       ├── config/          # Database configuration
│       ├── controllers/    # Request handlers
│       ├── emails/         # Email templates
│       ├── middlewares/    # Authentication middleware
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API route definitions
│       └── services/       # Shared backend services
└── frontend/
	├── App.jsx
	├── Index.css
	├── main.jsx
	└── src/
		├── components/     # Shared UI components
		├── context/        # Authentication state
		├── layouts/		# Dashboard layout
		├── pages/          # Application pages
		└── services/		# Auth functions
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string
- An SMTP account for password-reset and welcome emails

### 1. Clone and install dependencies

```bash
git clone "https://github.com/papu9679/Online-Assessment-Platform.git"
cd "Online Assessment Platform"

cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure the backend

Create `backend/.env`:

```env
PORT=5000
MONGODB_LOCAL_URL=mongodb://127.0.0.1:27017/online-assessment-platform
JWT_SECRET_KEY=replace-with-a-long-random-secret
FRONTEND_BASE_URL=http://localhost:5173

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

The current email service is configured for Gmail through Nodemailer and uses the `EMAIL_USER` and `EMAIL_PASS` values.

Create `frontend/.env`:

```env
VITE_BACKEND_BASE_URL=http://localhost:5000/api
```

### 3. Start the application

Start the backend in one terminal:

```bash
cd backend
node server.js
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in a browser.

## Development Notes

- The backend allows credentialed requests from `http://localhost:5173`.
- Authentication requests must include credentials so the browser sends the HTTP-only cookie.
- Quiz and attempt schemas are present in the backend, but quiz-management and quiz-taking routes still need to be added before those workflows are fully operational.

## Available Frontend Commands

From the `frontend` directory:

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

---
# I Am working with the `sign up` page which is not working properly