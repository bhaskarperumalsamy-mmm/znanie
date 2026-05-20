"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DeleteModal from '@/components/admin/DeleteModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  
  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchUsers();
    }
  }, [search, roleFilter, pagination.page]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user || data.user.role !== 'ADMIN') {
        router.push('/login');
        return;
      }
      
      fetchUsers();
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      params.set('page', pagination.page.toString());
      params.set('limit', '20');
      if (search) params.set('search', search);
      if (roleFilter) params.set('role', roleFilter);
      
      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      
      setUsers(data.users || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (userId: string) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUserId) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteUserId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete user');
        return;
      }
      
      setShowDeleteModal(false);
      setDeleteUserId(null);
      fetchUsers();
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  const handleSendInvitation = async (userId: string) => {
    if (!confirm('Send password setup invitation to this user?')) return;
    
    try {
      const res = await fetch(`/api/admin/users/${userId}/invite`, {
        method: 'POST',
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Failed to send invitation');
        return;
      }
      
      alert('Invitation sent successfully!');
    } catch (err) {
      alert('Something went wrong');
    }
  };

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      ADMIN: 'bg-red-100 text-red-800',
      TEACHER: 'bg-purple-100 text-purple-800',
      COUNSELOR: 'bg-blue-100 text-blue-800',
      MENTOR: 'bg-indigo-100 text-indigo-800',
      STUDENT: 'bg-green-100 text-green-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Create and manage platform users</p>
        </div>
        <Link
          href="/admin/users/new"
          className="px-4 py-2 bg-[#c1121f] text-white rounded-lg hover:bg-[#b5110a] transition"
        >
          + Create User
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPagination(p => ({ ...p, page: 1 })); }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
        />
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPagination(p => ({ ...p, page: 1 })); }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="TEACHER">Teacher</option>
          <option value="COUNSELOR">Counselor</option>
          <option value="MENTOR">Mentor</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isVerified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleSendInvitation(user.id)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Invite
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
            disabled={pagination.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {pagination.page} of {pagination.pages} ({pagination.total} users)
          </span>
          <button
            onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => { setShowDeleteModal(false); setDeleteUserId(null); }}
        loading={deleting}
      />
    </div>
  );
}