"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  email: string;
}

export default function EditClassPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params?.id as string;

  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    studentIds: [] as string[]
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user || data.user.role !== 'TEACHER') {
        router.push('/login');
        return;
      }
      
      await Promise.all([fetchStudents(), fetchClassDetails()]);
      setLoading(false);
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setAllStudents(data.students || []);
    } catch (err) {
      console.error('Failed to fetch students');
    }
  };

  const fetchClassDetails = async () => {
    try {
      const res = await fetch(`/api/classes/${classId}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      const cls = data.class;
      setFormData({
        title: cls.title,
        description: cls.description || '',
        studentIds: cls.students.map((s: any) => s.id)
      });
    } catch (err) {
      setError('Failed to load class details');
    }
  };

  const handleStudentToggle = (studentId: string) => {
    setFormData(prev => {
      const isSelected = prev.studentIds.includes(studentId);
      if (isSelected) {
        return { ...prev, studentIds: prev.studentIds.filter(id => id !== studentId) };
      } else {
        return { ...prev, studentIds: [...prev.studentIds, studentId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/classes/${classId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update class');
      }

      setSuccessMsg('Class updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this class? This cannot be undone.')) {
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const res = await fetch(`/api/classes/${classId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete class');
      }

      router.push('/teacher/classes');
    } catch (err: any) {
      setError(err.message);
      setDeleting(false);
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <Link href="/teacher/classes" className="text-[#c1121f] hover:text-[#b5110a] text-sm">
            ← Back to Classes
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Manage Class</h1>
          <p className="text-gray-500 mt-1">Update details or change student enrollment</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete Class'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200">
              {successMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Class Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5 flex justify-between items-end">
              <span>Enroll Students</span>
              <span className="text-xs font-normal text-gray-500">{formData.studentIds.length} enrolled</span>
            </label>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 bg-gray-50">
                {allStudents.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">No students available</div>
                ) : (
                  allStudents.map(student => (
                    <label key={student.id} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData.studentIds.includes(student.id)}
                        onChange={() => handleStudentToggle(student.id)}
                        className="w-5 h-5 text-[#c1121f] rounded border-gray-300 focus:ring-[#c1121f]"
                      />
                      <div className="ml-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center font-medium text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <Link
            href="/teacher/classes"
            className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || !formData.title.trim()}
            className="px-5 py-2.5 bg-[#c1121f] hover:bg-[#b5110a] text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
