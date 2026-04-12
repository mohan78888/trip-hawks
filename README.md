# ✈️ The Trip Hawks — Premium Flight Booking

A modern full-stack flight booking platform with React frontend, Express/Node backend, Clerk authentication, MongoDB, and Gemini AI assistant.

---

## 📁 Project Structure

```
trip-hawks/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   # All UI components
│   │   ├── services/     # API call helpers (flight, auth, gemini)
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── types.ts
│   ├── public/           # Static assets (logos, images)
│   ├── index.html
│   ├── vite.config.ts    # Proxies /api → backend:5000
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.local        # Frontend env vars (VITE_*)
│
└── backend/           # Express + TypeScript + MongoDB
    ├── src/
    │   ├── controllers/  # flightController, aiController, authController, webhookController
    │   ├── middleware/   # Clerk auth middleware
    │   ├── models/       # User mongoose model
    │   └── server.ts     # Express app entry point
    ├── package.json
    ├── tsconfig.json
    └── .env.local        # Backend env vars (secrets, DB URI)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Clerk account (https://clerk.com)
- Google Gemini API key (https://aistudio.google.com)

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `backend/.env.local` and fill in your values:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
FRONTEND_URL=http://localhost:3000
```

Build and start the backend:
```bash
npm run build:start
```

The backend runs on **http://localhost:5000**

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Edit `frontend/.env.local`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

The frontend runs on **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register with email/password |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/user/profile` | Get Clerk-authenticated user profile |
| POST | `/api/flights/search` | Search for flights |
| GET | `/api/flights/:id` | Get flight details |
| POST | `/api/ai/chat` | Chat with Gemini AI assistant |
| POST | `/api/webhooks/clerk` | Clerk webhook (user sync to MongoDB) |
| GET | `/health` | Backend health check |
| GET | `/api/status` | API + DB status |

---

## 🔑 Environment Variables Reference

### Frontend (`frontend/.env.local`)
| Variable | Description |
|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key from dashboard |
| `VITE_API_URL` | Backend URL (used by Vite proxy in dev) |

### Backend (`backend/.env.local`)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `GEMINI_API_KEY` | Google Gemini API key |
| `CLERK_SECRET_KEY` | Clerk backend secret key |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook signing secret |
| `FRONTEND_URL` | Frontend URL for CORS in production |

---

## 🛠️ Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Clerk React  
**Backend:** Express 5, TypeScript, MongoDB + Mongoose, Clerk SDK, Google Gemini AI, Svix  
**Auth:** Clerk (primary) + JWT (legacy endpoints)  
**AI:** Google Gemini 2.5 Flash with automatic fallback to 2.0 Flash
