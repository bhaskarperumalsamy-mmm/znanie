"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export default function TeacherAvailabilityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState<Availability[]>([]);

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
      
      fetchAvailability();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await fetch('/api/availability');
      const data = await res.json();
      setAvailability(data.availability || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c1121f]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
        <p className="text-gray-500 mt-1">Set your available time slots for students to book</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Your Weekly Schedule</h3>
        
        {availability.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No availability slots set yet.</p>
            <p className="text-gray-400 text-sm">Availability management coming soon.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {availability.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900 w-24">{days[slot.dayOfWeek]}</span>
                  <span className="text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${slot.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {slot.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}