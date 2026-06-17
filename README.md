# Invoice Expense Management System

A modern full-stack financial management platform designed to simplify invoice creation, expense tracking, employee management, and business reporting.

This project provides a structured system where managers can manage employees, record expenses, generate invoices, view financial insights, and maintain business-related financial data securely.

---

## Features

- Manager authentication and protected dashboard
- Employee profile management
- Expense creation, tracking, and updating
- Invoice generation and management
- Business reporting dashboard
- Comment and communication features
- Real-time update support using Pusher
- Secure password hashing with bcrypt
- PostgreSQL database integration
- Full-stack architecture with separate backend and frontend

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast
- Pusher JS

### Backend
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT Authentication
- Passport JWT
- bcrypt
- Pusher

---

## Project Structure

```bash
Invoice-Expense-Management-System/
│
├── backend/        # NestJS backend API
├── frontend/       # Next.js frontend application
└── .gitignore
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/iamskyline49/Invoice-Expense-Management-System.git
cd Invoice-Expense-Management-System
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=invoice_expense_db
JWT_SECRET=your_jwt_secret
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
```

Run the backend:

```bash
npm run start:dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
```

Run the frontend:

```bash
npm run dev
```

Open the application:

```bash
http://localhost:3000
```

---

## Available Scripts

### Backend

```bash
npm run start
npm run start:dev
npm run build
npm run start:prod
```

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## Screenshots

Add screenshots inside a folder named `screenshots/`, then update this section:

```md
![Dashboard](screenshots/dashboard.png)
![Invoice Page](screenshots/invoice.png)
![Expense Page](screenshots/expense.png)
```

---

## Future Improvements

- Add role-based access control
- Add PDF invoice export
- Add email notification system
- Add advanced analytics charts
- Add Docker support
- Add API documentation using Swagger

---

## Author

**Prottoy Sarker Diganto**  
GitHub: [iamskyline49](https://github.com/iamskyline49)

---

## License

This project is for academic and portfolio purposes.
