# Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Installation

### 1. Clone and Install Dependencies

```bash
cd znanie
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://postgres:Admin@123@100.106.212.19:5432/znanie_db?schema=public"

# Auth
JWT_SECRET=your_jwt_secret_key_here

# Zoom API (Server-to-Server OAuth)
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret
ZOOM_ACCOUNT_ID=your_zoom_account_id
```

### 3. Database Setup

Run Prisma migrations to create database tables:

```bash
npx prisma migrate dev --name init
```

Generate Prisma client:

```bash
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3002`

---

## Project Structure

```
znanie/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   └── teachers/
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── layout/       # Layout components
│   │   └── sections/     # Section components
│   ├── lib/              # Utility libraries
│   │   ├── prisma.ts     # Prisma client
│   │   ├── auth.ts      # Authentication
│   │   └── zoom.ts      # Zoom API
│   └── context/          # React contexts
├── prisma/
│   └── schema.prisma     # Database schema
├── docs/                 # Documentation
└── public/               # Static files
```

---

## Useful Commands

### Development

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Database

```bash
npx prisma studio           # Open Prisma Studio
npx prisma generate       # Generate Prisma client
npx prisma migrate dev   # Create new migration
npx prisma migrate deploy # Apply migrations
```

### Zoom Setup

1. Go to https://marketplace.zoom.us/
2. Create a Server-to-Server OAuth app
3. Get credentials:
   - Account ID
   - Client ID
   - Client Secret
4. Add to `.env` file

---

## Testing User Flows

### Register as Teacher

1. Go to `/register`
2. Select role: "Teacher"
3. Fill in details and register

### Setup Teacher Profile

1. Login as teacher
2. Go to `/dashboard/profile`
3. Add bio, specializations, hourly rate

### Create Meeting (Teacher)

1. Login as teacher
2. Go to `/dashboard/create-meeting`
3. Select student, date/time, meeting type
4. Click "Create Meeting"
5. Zoom meeting is auto-created

### Book Meeting (Student)

1. Login as student (or register new)
2. Go to `/dashboard/book`
3. Select teacher
4. Choose date/time
5. Click "Book Meeting"
6. Zoom meeting is auto-created

### View/Create Meetings

1. Go to `/dashboard/meetings`
2. See all your meetings
3. Click on a meeting to see details
4. Click "Join Meeting" to join Zoom call

---

## Troubleshooting

### Port Already in Use

If port 3002 is in use, specify a different port:

```bash
npm run dev -- -p 3003
```

### Prisma Errors

If you get Prisma errors, try regenerating:

```bash
npx prisma generate
rm -rf .next
npm run build
```

### Zoom API Errors

Make sure Zoom credentials are correct in `.env`:
- ZOOM_CLIENT_ID
- ZOOM_CLIENT_SECRET
- ZOOM_ACCOUNT_ID

### Database Connection Issues

Verify DATABASE_URL in `.env` format:
```
postgresql://username:password@host:port/database?schema=public
```

---

## Production Build

```bash
npm run build
npm run start
```

---

## Dependencies

### Main Dependencies

- next: ^16.2.1
- react: ^18.2.0
- react-dom: ^18.2.0
- @prisma/client: ^5.22.0
- bcryptjs: ^2.4.3
- jsonwebtoken: ^9.0.0
- framer-motion: ^12.38.0
- lucide-react: ^1.7.0

### Dev Dependencies

- prisma: ^5.22.0
- typescript: ^6.0.2
- @types/node: ^25.5.0
- @types/react: ^19.2.14