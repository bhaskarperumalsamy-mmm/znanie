import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear all existing data in correct order (respecting foreign keys)
  console.log('🗑️  Clearing existing data...');
  
  await prisma.review.deleteMany();
  await prisma.actionItem.deleteMany();
  await prisma.meetingNote.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.class.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Data cleared');

  // Hash password helper
  const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 12);
  };

  // Create users
  console.log('👤 Creating users...');

  const adminPassword = await hashPassword('admin123');
  const teacherPassword = await hashPassword('teacher123');
  const counselorPassword = await hashPassword('counselor123');
  const studentPassword = await hashPassword('student123');

  // Admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@znanie.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isVerified: true,
    },
  });
  console.log('   ✅ Created ADMIN: admin@znanie.com / admin123');

  // Teacher users
  const teacher1 = await prisma.user.create({
    data: {
      email: 'teacher@znanie.com',
      password: teacherPassword,
      name: 'John Smith',
      role: 'TEACHER',
      isVerified: true,
    },
  });

  const teacher2 = await prisma.user.create({
    data: {
      email: 'teacher2@znanie.com',
      password: teacherPassword,
      name: 'Maria Ivanov',
      role: 'TEACHER',
      isVerified: true,
    },
  });

  const counselor = await prisma.user.create({
    data: {
      email: 'counselor@znanie.com',
      password: counselorPassword,
      name: 'Natasha Petrova',
      role: 'COUNSELOR',
      isVerified: true,
    },
  });

  const mentor = await prisma.user.create({
    data: {
      email: 'mentor@znanie.com',
      password: counselorPassword,
      name: 'Aleksei Volkov',
      role: 'MENTOR',
      isVerified: true,
    },
  });

  console.log('   ✅ Created TEACHER: teacher@znanie.com / teacher123');
  console.log('   ✅ Created TEACHER: teacher2@znanie.com / teacher123');
  console.log('   ✅ Created COUNSELOR: counselor@znanie.com / counselor123');
  console.log('   ✅ Created MENTOR: mentor@znanie.com / counselor123');

  // Student users
  const student1 = await prisma.user.create({
    data: {
      email: 'student@znanie.com',
      password: studentPassword,
      name: 'Alex Patel',
      role: 'STUDENT',
      isVerified: true,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: 'student2@znanie.com',
      password: studentPassword,
      name: 'Priya Sharma',
      role: 'STUDENT',
      isVerified: true,
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: 'student3@znanie.com',
      password: studentPassword,
      name: 'Rahul Kumar',
      role: 'STUDENT',
      isVerified: true,
    },
  });

  console.log('   ✅ Created STUDENT: student@znanie.com / student123');
  console.log('   ✅ Created STUDENT: student2@znanie.com / student123');
  console.log('   ✅ Created STUDENT: student3@znanie.com / student123');

  // Create Teacher Profiles
  console.log('📝 Creating teacher profiles...');

  await prisma.teacherProfile.create({
    data: {
      userId: teacher1.id,
      bio: 'Experienced teacher with 10+ years in Russian language instruction. Specialized in conversational Russian and academic preparation.',
      specializations: ['Russian Language', 'Conversation', 'Academic Russian'],
      certifications: ['TLS Intermediate', 'TEFL Certified'],
      hourlyRate: 25.0,
      languages: ['English', 'Russian', 'Hindi'],
    },
  });

  await prisma.teacherProfile.create({
    data: {
      userId: teacher2.id,
      bio: 'Native Russian speaker and certified language instructor. Focus on pronunciation and cultural immersion.',
      specializations: ['Russian Language', 'Pronunciation', 'Cultural Studies'],
      certifications: ['Russian Ministry of Education', 'CELTA'],
      hourlyRate: 30.0,
      languages: ['English', 'Russian', 'German'],
    },
  });

  await prisma.teacherProfile.create({
    data: {
      userId: counselor.id,
      bio: 'Educationcounselor specializing in Russian university admissions and career guidance.',
      specializations: ['University Admissions', 'Career Counseling', 'Visa Guidance'],
      certifications: ['ICF Certified Coach'],
      hourlyRate: 45.0,
      languages: ['English', 'Russian', 'Hindi'],
    },
  });

  await prisma.teacherProfile.create({
    data: {
      userId: mentor.id,
      bio: 'Industry mentor with experience in tech and engineering sectors in Russia.',
      specializations: ['Career Mentorship', 'Technical Russian', 'Job Placement'],
      certifications: ['IEEE Member'],
      hourlyRate: 40.0,
      languages: ['English', 'Russian'],
    },
  });

  console.log('   ✅ Created 4 teacher profiles');

  // Create Availability for teachers
  console.log('📅 Creating availability...');

  const teacherAvailability = [
    { teacherId: teacher1.id, dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
    { teacherId: teacher1.id, dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
    { teacherId: teacher1.id, dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
    { teacherId: teacher1.id, dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
    { teacherId: teacher1.id, dayOfWeek: 5, startTime: '09:00', endTime: '14:00' },
    { teacherId: teacher2.id, dayOfWeek: 1, startTime: '10:00', endTime: '18:00' },
    { teacherId: teacher2.id, dayOfWeek: 2, startTime: '10:00', endTime: '18:00' },
    { teacherId: teacher2.id, dayOfWeek: 3, startTime: '10:00', endTime: '18:00' },
    { teacherId: teacher2.id, dayOfWeek: 4, startTime: '10:00', endTime: '18:00' },
    { teacherId: counselor.id, dayOfWeek: 2, startTime: '14:00', endTime: '20:00' },
    { teacherId: counselor.id, dayOfWeek: 4, startTime: '14:00', endTime: '20:00' },
    { teacherId: counselor.id, dayOfWeek: 6, startTime: '10:00', endTime: '16:00' },
    { teacherId: mentor.id, dayOfWeek: 3, startTime: '18:00', endTime: '21:00' },
    { teacherId: mentor.id, dayOfWeek: 5, startTime: '18:00', endTime: '21:00' },
  ];

  for (const av of teacherAvailability) {
    await prisma.availability.create({ data: av });
  }

  console.log('   ✅ Created availability slots');

  // Create Classes
  console.log('🏫 Creating classes...');

  const class1 = await prisma.class.create({
    data: {
      title: 'Beginner Russian A1',
      description: 'Introduction to Russian alphabet and basic phrases.',
      teacherId: teacher1.id,
      students: {
        connect: [{ id: student1.id }, { id: student2.id }],
      },
    },
  });

  const class2 = await prisma.class.create({
    data: {
      title: 'Conversational Practice B1',
      description: 'Weekly speaking practice on various topics.',
      teacherId: teacher2.id,
      students: {
        connect: [{ id: student2.id }, { id: student3.id }],
      },
    },
  });

  console.log('   ✅ Created classes with enrolled students');

  // Create Meetings
  console.log('🗓️ Creating meetings...');
  const now = new Date();
  
  await prisma.meeting.create({
    data: {
      title: 'First Day of Russian A1',
      description: 'Orientation and alphabet overview',
      startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
      endTime: new Date(now.getTime() + 25 * 60 * 60 * 1000),
      teacherId: teacher1.id,
      classId: class1.id,
      status: 'CONFIRMED',
      joinUrl: 'http://localhost:3002/meet/znanie-seed-meeting-1',
      conferenceId: 'znanie-seed-meeting-1',
      meetingType: 'GROUP'
    }
  });

  await prisma.meeting.create({
    data: {
      title: 'B1 Speaking Exam Prep',
      description: 'Practice for the speaking exam',
      startTime: new Date(now.getTime() + 48 * 60 * 60 * 1000), // Day after tomorrow
      endTime: new Date(now.getTime() + 49 * 60 * 60 * 1000),
      teacherId: teacher2.id,
      classId: class2.id,
      status: 'CONFIRMED',
      joinUrl: 'http://localhost:3002/meet/znanie-seed-meeting-2',
      conferenceId: 'znanie-seed-meeting-2',
      meetingType: 'GROUP'
    }
  });

  console.log('   ✅ Created sample class meetings');

  // Summary
  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📋 Test Credentials:');
  console.log('----------------------------------------');
  console.log('| Role      | Email                  | Password  |');
  console.log('----------------------------------------');
  console.log('| ADMIN     | admin@znanie.com      | admin123  |');
  console.log('| TEACHER   | teacher@znanie.com   | teacher123|');
  console.log('| TEACHER   | teacher2@znanie.com | teacher123|');
  console.log('| COUNSELOR | counselor@znanie.com  | counselor123|');
  console.log('| MENTOR    | mentor@znanie.com     | counselor123|');
  console.log('| STUDENT   | student@znanie.com   | student123|');
  console.log('| STUDENT   | student2@znanie.com  | student123|');
  console.log('| STUDENT   | student3@znanie.com  | student123|');
  console.log('----------------------------------------');
  console.log('');
  console.log('🔗 Login URLs:');
  console.log('   - Teacher: http://localhost:3002/teacher');
  console.log('   - Student: http://localhost:3002/student');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });