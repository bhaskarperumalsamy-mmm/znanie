"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Class {
  id: string;
  title: string;
  students: { name: string }[];
}

export default function TeacherCreateMeetingPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    classId: '',
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    meetingType: 'ONE_ON_ONE',
    maxParticipants: '10',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user) {
        router.push('/login');
        return;
      }
      
      if (!['TEACHER', 'COUNSELOR', 'MENTOR'].includes(data.user.role)) {
        router.push('/student');
        return;
      }
      
      fetchClasses();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes');
      const data = await res.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const startTime = new Date(`${formData.date}T${formData.time}`);
      const duration = parseInt(formData.duration);
      const endTime = new Date(startTime.getTime() + duration * 60000);

      const res = await fetch('/api/meetings/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId: formData.classId,
          title: formData.title,
          description: formData.description,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          meetingType: formData.meetingType,
          maxParticipants: parseInt(formData.maxParticipants),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create meeting');
      }

      setMessage('Meeting created successfully! Meeting link generated.');
      
      setTimeout(() => {
        router.push('/teacher/meetings');
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Meeting</h1>
        <p className="text-gray-500 mt-1">Schedule a meeting for a class</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
        {message && (
          <div className={`px-4 py-3 rounded-lg text-sm ${
            message.includes('success') 
              ? 'bg-green-50 border border-green-200 text-green-600' 
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Select Class
          </label>
          <select
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-white"
            required
          >
            <option value="">Choose a class...</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.students.length} student{c.students.length !== 1 && 's'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Meeting Title
          </label>
          <input
            type="text"
            placeholder="e.g., Russian Language Lesson 1"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description (optional)
          </label>
          <textarea
            placeholder="What will you cover in this session?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-white"
              required
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meeting Type
            </label>
            <select
              value={formData.meetingType}
              onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-white"
              required
            >
              <option value="ONE_ON_ONE">1-on-1 Session</option>
              <option value="GROUP">Group Session</option>
              <option value="ORIENTATION">Orientation</option>
            </select>
          </div>
        </div>

        {formData.meetingType === 'GROUP' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Max Participants
            </label>
            <input
              type="number"
              placeholder="10"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#c1121f] hover:bg-[#b5110a] text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Creating Meeting...' : 'Create Meeting'}
        </button>
      </form>
    </div>
  );
}