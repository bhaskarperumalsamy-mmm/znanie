"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Meeting {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  status: string;
  meetingType: string;
  joinUrl: string | null;
  teacher: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
  };
  class: {
    id: string;
    title: string;
  } | null;
}

export default function AdminMeetingsPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchMeetings();
    }
  }, [search, statusFilter]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user || data.user.role !== 'ADMIN') {
        router.push('/login');
        return;
      }
      
      fetchMeetings();
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchMeetings = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      
      const res = await fetch(`/api/admin/meetings?${params}`);
      const data = await res.json();
      setMeetings(data.meetings || []);
    } catch (err) {
      console.error('Error fetching meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      REQUESTED: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-red-100 text-red-800',
      NO_SHOW: 'bg-orange-100 text-orange-800',
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const handleCancelMeeting = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this meeting?')) return;

    try {
      const res = await fetch(`/api/admin/meetings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED' }),
      });

      if (!res.ok) throw new Error('Failed to cancel');

      fetchMeetings();
      setSelectedMeeting(null);
    } catch (err) {
      console.error('Error cancelling meeting:', err);
      alert('Failed to cancel meeting');
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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
        <p className="text-gray-500 mt-1">View and manage all meetings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="REQUESTED">Requested</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="NO_SHOW">No Show</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {meetings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No meetings found
                </td>
              </tr>
            ) : (
              meetings.map((meeting) => (
                <tr key={meeting.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{meeting.title}</div>
                    {meeting.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">{meeting.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{meeting.teacher.name}</div>
                    <div className="text-sm text-gray-500">{meeting.teacher.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {meeting.class?.title || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(meeting.startTime).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(meeting.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedMeeting(meeting)}
                      className="text-[#c1121f] hover:text-[#a01018] text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Meeting Details</h2>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Title</label>
                <p className="font-medium">{selectedMeeting.title}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Description</label>
                <p className="text-gray-700">{selectedMeeting.description || 'No description'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Start Time</label>
                  <p className="font-medium">
                    {new Date(selectedMeeting.startTime).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">End Time</label>
                  <p className="font-medium">
                    {new Date(selectedMeeting.endTime).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Teacher</label>
                <p className="font-medium">{selectedMeeting.teacher.name}</p>
                <p className="text-sm text-gray-500">{selectedMeeting.teacher.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Class</label>
                <p className="font-medium">{selectedMeeting.class?.title || 'No class'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge(selectedMeeting.status)}</div>
              </div>

              {selectedMeeting.joinUrl && (
                <div>
                  <label className="text-sm text-gray-500">Join URL</label>
                  <a
                    href={selectedMeeting.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c1121f] hover:underline block truncate"
                  >
                    {selectedMeeting.joinUrl}
                  </a>
                </div>
              )}

              {selectedMeeting.status !== 'CANCELLED' && selectedMeeting.status !== 'COMPLETED' && (
                <button
                  onClick={() => handleCancelMeeting(selectedMeeting.id)}
                  className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Cancel Meeting
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}