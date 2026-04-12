# Backend API Documentation

## Overview

The ZNANIE Meeting Organizer backend is built with Next.js API Routes and Prisma ORM with PostgreSQL.

## Base URL

```
http://localhost:3002/api
```

## Authentication

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| DELETE | `/api/auth/me` | Logout user |

### Register

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "STUDENT" | "TEACHER" | "COUNSELOR" | "MENTOR"
}
```

Response:
```json
{
  "user": {
    "id": "cu...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "STUDENT"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User

```bash
GET /api/auth/me
Authorization: Bearer <token>
```

Response:
```json
{
  "user": {
    "id": "cu...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "STUDENT"
  }
}
```

---

## Teachers

### List Teachers

```bash
GET /api/teachers
```

Query Parameters:
- `specialization` - Filter by specialization
- `language` - Filter by language
- `search` - Search by name/bio

Response:
```json
{
  "teachers": [
    {
      "id": "cu...",
      "name": "Teacher Name",
      "teacherProfile": {
        "bio": "Bio text",
        "specializations": ["Russian Language"],
        "avgRating": 4.5,
        "totalReviews": 10
      }
    }
  ]
}
```

### Teacher Profile

```bash
GET /api/teachers/profile
Authorization: Bearer <token>
```

Response:
```json
{
  "profile": {
    "id": "...",
    "userId": "cu...",
    "bio": "...",
    "specializations": ["Russian Language"],
    "hourlyRate": 25.00
  }
}
```

```bash
POST /api/teachers/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Teaching experience...",
  "specializations": ["Russian Language", "MBBS"],
  "hourlyRate": 30,
  "languages": ["English", "Russian"]
}
```

---

## Availability

### Get Availability

```bash
GET /api/availability
Authorization: Bearer <token>
```

Response:
```json
{
  "availability": [
    {
      "id": "...",
      "dayOfWeek": 1,
      "startTime": "09:00",
      "endTime": "17:00",
      "bufferMinutes": 15,
      "isActive": true
    }
  ]
}
```

### Create Availability

```bash
POST /api/availability
Authorization: Bearer <token>
Content-Type: application/json

{
  "dayOfWeek": 1,
  "startTime": "09:00",
  "endTime": "17:00",
  "bufferMinutes": 15
}
```

### Update Availability

```bash
PATCH /api/availability/[id]
Authorization: Bearer <token>
Content-Type: application/json

{
  "dayOfWeek": 2,
  "startTime": "10:00",
  "isActive": false
}
```

### Delete Availability

```bash
DELETE /api/availability/[id]
Authorization: Bearer <token>
```

---

## Meetings

### Get Meetings

```bash
GET /api/meetings
Authorization: Bearer <token>
```

Query Parameters:
- `status` - Filter by status (REQUESTED, CONFIRMED, COMPLETED, CANCELLED)

Response:
```json
{
  "meetings": [
    {
      "id": "...",
      "title": "Russian Lesson",
      "description": "...",
      "startTime": "2026-04-15T10:00:00Z",
      "endTime": "2026-04-15T11:00:00Z",
      "status": "REQUESTED",
      "meetingUrl": "https://zoom.us/j/...",
      "hostUrl": "https://zoom.us/s/...",
      "student": { "id": "...", "name": "Student Name" },
      "teacher": { "id": "...", "name": "Teacher Name" }
    }
  ]
}
```

### Student Books Meeting

```bash
POST /api/meetings
Authorization: Bearer <token>
Content-Type: application/json

{
  "teacherId": "teacher-id",
  "title": "Russian Lesson 1",
  "description": "First lesson",
  "startTime": "2026-04-15T10:00:00Z",
  "endTime": "2026-04-15T11:00:00Z",
  "meetingType": "ONE_ON_ONE"
}
```

### Teacher Creates Meeting

```bash
POST /api/meetings/teacher
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": "student-id",
  "title": "Russian Lesson 1",
  "description": "First lesson",
  "startTime": "2026-04-15T10:00:00Z",
  "endTime": "2026-04-15T11:00:00Z",
  "meetingType": "ONE_ON_ONE",
  "maxParticipants": 10
}
```

### Get Single Meeting

```bash
GET /api/meetings/[id]
Authorization: Bearer <token>
```

### Update Meeting

```bash
PATCH /api/meetings/[id]
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "CONFIRMED"
}
```

### Cancel Meeting

```bash
DELETE /api/meetings/[id]
Authorization: Bearer <token>
```

---

## Meeting Notes

### Get Notes

```bash
GET /api/meetings/[id]/notes
Authorization: Bearer <token>
```

### Add Note

```bash
POST /api/meetings/[id]/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Lesson notes...",
  "isPrivate": false
}
```

---

## Action Items

### Get Action Items

```bash
GET /api/meetings/[id]/action-items
Authorization: Bearer <token>
```

### Add Action Item

```bash
POST /api/meetings/[id]/action-items
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete assignment",
  "assigneeId": "user-id",
  "dueDate": "2026-04-20T00:00:00Z"
}
```

---

## Reschedule Meeting

```bash
POST /api/meetings/[id]/reschedule
Authorization: Bearer <token>
Content-Type: application/json

{
  "startTime": "2026-04-16T10:00:00Z",
  "endTime": "2026-04-16T11:00:00Z"
}
```

---

## Reviews

### Get Reviews

```bash
GET /api/reviews?teacherId=teacher-id
```

### Create Review

```bash
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "meetingId": "meeting-id",
  "teacherId": "teacher-id",
  "overallRating": 5,
  "knowledgeRating": 5,
  "communicationRating": 4,
  "comment": "Great teacher!"
}
```

---

## Students

### List Students

```bash
GET /api/students
Authorization: Bearer <token>
```

Response:
```json
{
  "students": [
    {
      "id": "...",
      "name": "Student Name",
      "email": "student@example.com"
    }
  ]
}
```

---

## Analytics

### Get Analytics

```bash
GET /api/analytics?type=student|teacher|admin
Authorization: Bearer <token>
```

Response:
```json
{
  "stats": {
    "total": 10,
    "completed": 5,
    "cancelled": 2,
    "upcoming": 3
  }
}
```

---

## Error Responses

All errors return:

```json
{
  "error": "Error message"
}
```

Status Codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error