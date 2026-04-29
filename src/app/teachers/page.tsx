"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './teachers.module.css';

interface Teacher {
  id: string;
  name: string;
  profilePhoto: string | null;
  timezone: string;
  language: string;
  teacherProfile: {
    bio: string | null;
    specializations: string[];
    certifications: string[];
    hourlyRate: number | null;
    avgRating: number;
    totalReviews: number;
    languages: string[];
  } | null;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teachers');
      const data = await res.json();
      setTeachers(data.teachers || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase()) ||
    teacher.teacherProfile?.specializations?.some((s) =>
      s.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Our Teachers</h1>
        <p>Find the perfect teacher for your learning needs</p>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredTeachers.length === 0 ? (
        <div className={styles.empty}>
          <p>No teachers found. Check back later!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className={styles.card}>
              <div className={styles.avatar}>
                {teacher.name.charAt(0)}
              </div>
              
              <h3>{teacher.name}</h3>
              
              {teacher.teacherProfile && teacher.teacherProfile.avgRating > 0 && (
                <div className={styles.rating}>
                  ⭐ {teacher.teacherProfile.avgRating.toFixed(1)} ({teacher.teacherProfile.totalReviews} reviews)
                </div>
              )}
              
              {teacher.teacherProfile && teacher.teacherProfile.specializations?.length > 0 && (
                <div className={styles.tags}>
                  {teacher.teacherProfile.specializations.slice(0, 3).map((spec) => (
                    <span key={spec} className={styles.tag}>{spec}</span>
                  ))}
                </div>
              )}
              
              {teacher.teacherProfile?.bio && (
                <p className={styles.bio}>{teacher.teacherProfile.bio}</p>
              )}
              
              <Link href={`/student/book?teacher=${teacher.id}`} className={styles.bookBtn}>
                Book Session
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}