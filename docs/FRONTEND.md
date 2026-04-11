# Frontend Documentation

## Overview

The ZNANIE Meeting Organizer frontend is built with Next.js 16, React 18, and TypeScript. It uses CSS Modules for styling.

## Page Routes

### Route Groups

```
src/app/
├── (auth)/              # Login/Register pages (no header/footer)
├── (dashboard)/        # Dashboard pages (sidebar, no header/footer)
├── (marketing)/         # Public marketing pages (via root layout)
├── (public)/           # Semi-public pages like /teachers
├── login/              # Login page
├── register/           # Registration page
├── dashboard/           # Main dashboard
│   ├── page.tsx
│   ├── calendar/
│   ├── meetings/
│   ├── book/
│   ├── create-meeting/
│   ├── availability/
│   ├── profile/
│   └── analytics/
├── teachers/            # Browse teachers page
└── home/               # Home page
```

### Public Pages (with Header/Footer)

| Route | File | Description |
|-------|------|-------------|
| `/home` | `src/app/home/page.tsx` | Landing page |
| `/about-us` | `src/app/about-us/page.tsx` | About page |
| `/why-choose-us` | `src/app/why-choose-us/page.tsx` | Why choose us |
| `/study-in-russia` | `src/app/study-in-russia/page.tsx` | Study in Russia info |
| `/russian-language-courses` | `src/app/russian-language-courses/page.tsx` | Russian courses |
| `/contact` | `src/app/contact/page.tsx` | Contact form |
| `/teachers` | `src/app/teachers/page.tsx` | Browse teachers |
| `/career` | `src/app/career/page.tsx` | Career page |

### Auth Pages

| Route | File | Description |
|-------|------|-------------|
| `/login` | `src/app/login/page.tsx` | User login |
| `/register` | `src/app/register/page.tsx` | User registration |

### Dashboard Pages (Authenticated)

| Route | File | Description |
|-------|------|-------------|
| `/dashboard` | `src/app/dashboard/page.tsx` | Main dashboard |
| `/dashboard/calendar` | `src/app/dashboard/calendar/page.tsx` | Calendar view |
| `/dashboard/meetings` | `src/app/dashboard/meetings/page.tsx` | My meetings list |
| `/dashboard/meetings/[id]` | `src/app/dashboard/meetings/[id]/page.tsx` | Meeting details |
| `/dashboard/book` | `src/app/dashboard/book/page.tsx` | Book meeting (student) |
| `/dashboard/create-meeting` | `src/app/dashboard/create-meeting/page.tsx` | Create meeting (teacher) |
| `/dashboard/availability` | `src/app/dashboard/availability/page.tsx` | Manage availability |
| `/dashboard/profile` | `src/app/dashboard/profile/page.tsx` | Teacher profile setup |
| `/dashboard/analytics` | `src/app/dashboard/analytics/page.tsx` | Analytics dashboard |

## Layouts

### Root Layout (`src/app/layout.tsx`)
- Contains Navbar and Footer for all public pages
- Uses original Navbar and Footer components

### Dashboard Layout (`src/app/(dashboard)/layout.tsx`)
- Custom dark sidebar layout
- No header/footer
- Auto-redirect to login if not authenticated
- Shows different nav links based on user role

### Auth Layout (`src/app/(auth)/layout.tsx`)
- Split-screen layout
- Left: Brand panel with gradient
- Right: Login/Register form

### Marketing Layout (`src/app/(marketing)/layout.tsx`)
- Uses Navbar and Footer components
- For public marketing pages

## Navigation

### Navbar Links (Public)
- Home → `/home`
- About Us → `/about-us`
- Why Choose Us → `/why-choose-us`
- Teachers → `/teachers`
- Study in Russia → dropdown
- Russian Language Courses → `/russian-language-courses`
- Contact → `/contact`

### Dashboard Sidebar Links

**For All Users:**
- Dashboard → `/dashboard`
- Calendar → `/dashboard/calendar`
- My Meetings → `/dashboard/meetings`
- Book Meeting → `/dashboard/book`
- Analytics → `/dashboard/analytics`
- Browse Teachers → `/teachers`

**For Teachers (Additional):**
- Availability → `/dashboard/availability`
- My Profile → `/dashboard/profile`
- Create Meeting → `/dashboard/create-meeting`

## User Roles and Access

| Role | Access |
|------|--------|
| `STUDENT` | Book meetings, view own meetings, join meetings |
| `TEACHER` | Create meetings, manage availability, view students |
| `COUNSELOR` | Same as teacher + student profiles |
| `MENTOR` | Flexible scheduling, group sessions |
| `ADMIN` | All analytics, user management |