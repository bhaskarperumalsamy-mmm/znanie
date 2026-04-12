# Components Documentation

## Overview

The ZNANIE Meeting Organizer uses React components with CSS Modules for styling. Components are located in `src/components/`.

## Directory Structure

```
src/components/
├── ui/              # Reusable UI components
├── layout/           # Layout components (Navbar, Footer)
└── sections/        # Section components for pages
```

---

## UI Components

### Button

**File**: `src/components/ui/Button.tsx`

**Props**:
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
}
```

**Usage**:
```tsx
import { Button } from '@/components/ui/Button';

// Primary button
<Button>Click Me</Button>

// Full width submit
<Button type="submit" fullWidth>Submit</Button>

// Disabled button
<Button disabled>Disabled</Button>

// Link button
<Button href="/dashboard">Go to Dashboard</Button>
```

**Variants**:
- `primary` - Red background, white text
- `secondary` - White background, dark text
- `outline` - Transparent, border only
- `dark` - Dark background, white text

---

### Card

**File**: `src/components/ui/Card.tsx`

**Props**:
```typescript
interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
  badgeColor?: 'red' | 'yellow';
  category?: string;
  title: string;
  description?: string;
  href?: string;
  price?: string;
  meta?: React.ReactNode;
}
```

**Usage**:
```tsx
import { Card } from '@/components/ui/Card';

<Card
  imageSrc="/images/course.jpg"
  title="Russian Language Course"
  description="Learn Russian from basics"
  price="$199"
  badge="Popular"
  href="/courses/1"
/>
```

---

### Input

**File**: `src/components/ui/Input.tsx`

**Components**:
- `Input` - Text input
- `Textarea` - Multi-line text
- `Select` - Dropdown select

**Props - Input**:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

**Props - Textarea**:
```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
```

**Props - Select**:
```typescript
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}
```

**Usage**:
```tsx
import { Input, Textarea, Select } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>

<Textarea
  label="Description"
  placeholder="Enter description"
/>

<Select
  label="Role"
  options={[
    { value: 'STUDENT', label: 'Student' },
    { value: 'TEACHER', label: 'Teacher' }
  ]}
/>
```

---

### SectionHeader

**File**: `src/components/ui/SectionHeader.tsx`

**Usage**:
```tsx
import { SectionHeader } from '@/components/ui/SectionHeader';

<SectionHeader
  tag="Our Courses"
  heading="Featured Courses"
  subheading="Start learning Russian today"
/>
```

---

## Layout Components

### Navbar

**File**: `src/components/layout/Navbar.tsx`

Features:
- Responsive navigation
- Dropdown menus
- Mobile hamburger menu
- Auth state (Sign In/Sign Up or Dashboard/Logout)

**Navigation Links**:
- Home → `/home`
- About Us → `/about-us`
- Why Choose Us → `/why-choose-us`
- Teachers → `/teachers`
- Study in Russia → dropdown
- Contact → `/contact`

---

### Footer

**File**: `src/components/layout/Footer.tsx`

Links:
- Main Pages (Home, About Us, Study in Russia)
- Explore (Why Choose Us, Russian Language Courses, Contact)

---

## Dashboard Components

### Dashboard Layout

**File**: `src/app/(dashboard)/layout.tsx`

Features:
- Fixed dark sidebar
- User avatar and role display
- Dynamic navigation based on role
- Logout button
- Back to website link

**Sidebar Navigation**:
- Dashboard
- Calendar
- My Meetings
- Book Meeting
- Availability (Teacher)
- My Profile (Teacher)
- Create Meeting (Teacher)
- Analytics
- Browse Teachers

---

## Custom CSS Modules

Each component has a corresponding CSS Module file:

```
Button.tsx → Button.module.css
Card.tsx → Card.module.css
Input.tsx → Input.module.css
```

### CSS Variables

The project uses CSS variables defined in `src/app/globals.css`:

```css
:root {
  --color-primary: #dc2525;
  --color-primary-hover: #b5110a;
  --color-secondary: #ffb502;
  --color-dark: #0e1010;
  --color-white: #ffffff;
  --color-soft-gray: #f1f1f1;
  --color-border: #d9d9d9;
  --color-body: #0e1010b3;
  
  --radius-sm: .625rem;
  --radius-md: .9375rem;
  --radius-lg: 1.875rem;
  
  --font-heading: Lexend, sans-serif;
  --font-body: DM Sans, sans-serif;
}
```

---

## Reusable Patterns

### Form Submission

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const res = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error);
    }
    
    // Success
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Auth Check

```tsx
useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    
    if (!data.user) {
      router.push('/login');
    }
  };
  
  checkAuth();
}, []);
```

### Loading State

```tsx
if (loading) {
  return <div className={styles.container}><p>Loading...</p></div>;
}
```

---

## Icons

The project uses Bootstrap Icons (loaded via CDN):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
```

Common icons used:
- `<i class="bi bi-person"></i>` - Person
- `<i class="bi bi-calendar"></i>` - Calendar
- `<i class="bi bi-journal"></i>` - Book
- `<i class="bi bi-star"></i>` - Star/Rating
- `<i class="bi bi-chat-dots"></i>` - Chat