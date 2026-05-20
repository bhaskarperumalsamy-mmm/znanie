"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  overallRating: number;
  knowledgeRating: number | null;
  communicationRating: number | null;
  punctualityRating: number | null;
  helpfulnessRating: number | null;
  comment: string | null;
  isAnonymous: boolean;
  createdAt: string;
  reviewer: {
    id: string;
    name: string;
    email: string;
  };
  teacher: {
    id: string;
    name: string;
    email: string;
  };
  meeting: {
    id: string;
    title: string;
    startTime: string;
  } | null;
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchReviews();
    }
  }, [ratingFilter]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      
      if (!data.user || data.user.role !== 'ADMIN') {
        router.push('/login');
        return;
      }
      
      fetchReviews();
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchReviews = async () => {
    try {
      const params = new URLSearchParams();
      if (ratingFilter) params.set('rating', ratingFilter);
      
      const res = await fetch(`/api/admin/reviews?${params}`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      fetchReviews();
      setSelectedReview(null);
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
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
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1">View and manage all teacher reviews</p>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c1121f] focus:border-transparent"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No reviews found
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedReview(review)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      {renderStars(review.overallRating)}
                      <span className="ml-2 font-semibold text-gray-900">{review.overallRating}/5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>Teacher: <strong>{review.teacher.name}</strong></span>
                    <span>•</span>
                    <span>By: <strong>{review.isAnonymous ? 'Anonymous' : review.reviewer.name}</strong></span>
                  </div>
                  
                  {review.comment && (
                    <p className="text-gray-700 line-clamp-2">{review.comment}</p>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {review.meeting?.title && <span>Meeting: {review.meeting.title} • </span>}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteReview(review.id);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Review Details</h2>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Overall Rating</label>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(selectedReview.overallRating)}
                  <span className="font-semibold">{selectedReview.overallRating}/5</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedReview.knowledgeRating && (
                  <div>
                    <label className="text-sm text-gray-500">Knowledge</label>
                    <p className="font-medium">{selectedReview.knowledgeRating}/5</p>
                  </div>
                )}
                {selectedReview.communicationRating && (
                  <div>
                    <label className="text-sm text-gray-500">Communication</label>
                    <p className="font-medium">{selectedReview.communicationRating}/5</p>
                  </div>
                )}
                {selectedReview.punctualityRating && (
                  <div>
                    <label className="text-sm text-gray-500">Punctuality</label>
                    <p className="font-medium">{selectedReview.punctualityRating}/5</p>
                  </div>
                )}
                {selectedReview.helpfulnessRating && (
                  <div>
                    <label className="text-sm text-gray-500">Helpfulness</label>
                    <p className="font-medium">{selectedReview.helpfulnessRating}/5</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-500">Teacher</label>
                <p className="font-medium">{selectedReview.teacher.name}</p>
                <p className="text-sm text-gray-500">{selectedReview.teacher.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Reviewer</label>
                <p className="font-medium">
                  {selectedReview.isAnonymous ? 'Anonymous' : selectedReview.reviewer.name}
                </p>
                {!selectedReview.isAnonymous && (
                  <p className="text-sm text-gray-500">{selectedReview.reviewer.email}</p>
                )}
              </div>

              {selectedReview.meeting && (
                <div>
                  <label className="text-sm text-gray-500">Meeting</label>
                  <p className="font-medium">{selectedReview.meeting.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedReview.meeting.startTime).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm text-gray-500">Comment</label>
                <p className="text-gray-700">{selectedReview.comment || 'No comment'}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Created</label>
                <p className="font-medium">{new Date(selectedReview.createdAt).toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleDeleteReview(selectedReview.id)}
                className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}