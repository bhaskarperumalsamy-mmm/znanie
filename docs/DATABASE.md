# Database Documentation

## Overview

The database uses PostgreSQL with Prisma ORM. The schema is defined in `prisma/schema.prisma`.

## Connection

The database connection is configured via environment variables in `.env`:

```
DATABASE_URL="postgresql://postgres:Admin@123@100.106.212.19:5432/znanie_db?schema=public"
```

## Models

### User

```prisma
model User {
  id              String    @id @default(cuid())
  email           String   @unique
  password       String
  name           String
  role            Role      @default(STUDENT)
  timezone        String   @default("Asia/Kolkata")
  language        String   @default("en")
  profilePhoto   String?
  isVerified     Boolean  @default(false)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  
  // Relations
  teacherProfile  TeacherProfile?
  availability   Availability[]
  studentMeetings Meeting[] @relation("StudentMeetings")
  teacherMeetings Meeting[] @relation("TeacherMeetings")
  notifications  Notification[]
  meetingNotes   MeetingNote[]
  actionItems   ActionItem[]
  reviews       Review[]
}
```

**Fields:**
- `id` - Unique identifier (CUID)
- `email` - User email (unique)
- `password` - Hashed password
- `name` - Full name
- `role` - User role (STUDENT, TEACHER, COUNSELOR, MENTOR, ADMIN)
- `timezone` - User timezone (default: Asia/Kolkata)
- `language` - Preferred language (default: en)
- `profilePhoto` - Profile photo URL
- `isVerified` - Email verification status
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

---

### TeacherProfile

```prisma
model TeacherProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  bio             String?
  specializations  String[]
  certifications  String[]
  hourlyRate      Float?
  avgRating       Float    @default(0)
  totalReviews    Int      @default(0)
  languages      String[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

**Fields:**
- `id` - Unique identifier
- `userId` - Foreign key to User
- `bio` - Teacher biography
- `specializations` - Array of specializations
- `certifications` - Array of certifications
- `hourlyRate` - Hourly rate (USD)
- `avgRating` - Average rating (0-5)
- `totalReviews` - Total number of reviews
- `languages` - Languages taught

---

### Availability

```prisma
model Availability {
  id            String   @id @default(cuid())
  teacherId      String
  teacher       User     @relation(fields: [teacherId], references: [id])
  dayOfWeek     Int      // 0-6, Sunday-Saturday
  startTime    String   // "HH:mm" format
  endTime      String   // "HH:mm" format
  isRecurring   Boolean  @default(true)
  bufferMinutes Int      @default(15)
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

### Meeting

```prisma
model Meeting {
  id              String        @id @default(cuid())
  studentId       String
  student         User         @relation("StudentMeetings", fields: [studentId], references: [id])
  teacherId       String
  teacher         User         @relation("TeacherMeetings", fields: [teacherId], references: [id])
  title           String
  description     String?
  startTime       DateTime
  endTime         DateTime
  timezone        String       @default("Asia/Kolkata")
  meetingType     MeetingType  @default(ONE_ON_ONE)
  status          MeetingStatus @default(REQUESTED)
  meetingUrl      String?       // Zoom join URL
  hostUrl         String?       // Zoom host URL
  zoomMeetingId  String?       // Zoom meeting ID
  groupCode       String?       // Invite code
  maxParticipants Int?         @default(10)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  notes        MeetingNote[]
  actionItems  ActionItem[]
  review     Review?
}
```

---

### MeetingNote

```prisma
model MeetingNote {
  id          String   @id @default(cuid())
  meetingId   String
  meeting     Meeting  @relation(fields: [meetingId], references: [id])
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  content     String
  isPrivate   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

### ActionItem

```prisma
model ActionItem {
  id          String    @id @default(cuid())
  meetingId   String
  meeting    Meeting   @relation(fields: [meetingId], references: [id])
  assigneeId String
  assignee   User      @relation(fields: [assigneeId], references: [id])
  title      String
  dueDate    DateTime?
  status     String    @default("PENDING")
  createdAt  DateTime  @default(now())
  completedAt DateTime?
}
```

---

### Review

```prisma
model Review {
  id             String   @id @default(cuid())
  meetingId      String   @unique
  meeting       Meeting  @relation(fields: [meetingId], references: [id])
  reviewerId     String
  reviewer       User     @relation(fields: [reviewerId], references: [id])
  teacherId     String
  teacher       User     @relation(fields: [teacherId], references: [id])
  overallRating  Int
  knowledgeRating Int?
  communicationRating Int?
  punctualityRating  Int?
  helpfulnessRating Int?
  comment       String?
  isAnonymous   Boolean  @default(false)
  createdAt     DateTime @default(now())
}
```

---

### Notification

```prisma
model Notification {
  id             String   @id @default(cuid())
  userId         String
  user           User     @relation(fields: [userId], references: [id])
  type           String
  title         String
  message       String
  relatedEntity  String?
  relatedId      String?
  isRead         Boolean  @default(false)
  sentAt         DateTime  @default(now())
}
```

---

## Enums

### Role

```prisma
enum Role {
  STUDENT
  TEACHER
  COUNSELOR
  MENTOR
  ADMIN
}
```

### MeetingType

```prisma
enum MeetingType {
  ONE_ON_ONE
  GROUP
  ORIENTATION
}
```

### MeetingStatus

```prisma
enum MeetingStatus {
  REQUESTED
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}
```

---

## Indexes

```prisma
model Meeting {
  @@index([studentId])
  @@index([teacherId])
  @@index([startTime])
}

model Availability {
  @@index([teacherId])
}

model MeetingNote {
  @@index([meetingId])
}

model ActionItem {
  @@index([meetingId])
}

model Review {
  @@index([teacherId])
}

model Notification {
  @@index([userId])
}
```

---

## Migrations

To create a new migration after schema changes:

```bash
npx prisma migrate dev --name migration_name
```

To apply existing migrations:

```bash
npx prisma migrate deploy
```

---

## Troubleshooting

### Generate Prisma Client

If the Prisma client is out of sync:

```bash
npx prisma generate
```

### View Database

To view the database schema:

```bash
npx prisma studio
```

### Reset Database

To reset the database (WARNING: deletes all data):

```bash
npx prisma migrate reset
```