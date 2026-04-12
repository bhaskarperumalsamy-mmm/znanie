"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './meeting-detail.module.css';

interface Note {
  id: string;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  author: { id: string; name: string };
}

interface ActionItem {
  id: string;
  title: string;
  status: string;
  dueDate: string | null;
  createdAt: string;
  assignee: { id: string; name: string };
}

export default function MeetingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const meetingId = params.id as string;
  
  const [meeting, setMeeting] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [newNote, setNewNote] = useState('');
  const [newActionItem, setNewActionItem] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
      
      setUser(data.user);
      fetchMeeting();
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchMeeting = async () => {
    try {
      const res = await fetch(`/api/meetings/${meetingId}`);
      const data = await res.json();
      
      if (!res.ok) {
        router.push('/dashboard/meetings');
        return;
      }
      
      setMeeting(data.meeting);
      setNotes(data.meeting.notes || []);
      setActionItems(data.meeting.actionItems || []);
    } catch (error) {
      console.error('Error fetching meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`/api/meetings/${meetingId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newNote }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setNotes([...notes, data.note]);
        setNewNote('');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddActionItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionItem.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`/api/meetings/${meetingId}/action-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newActionItem }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setActionItems([...actionItems, data.actionItem]);
        setNewActionItem('');
      }
    } catch (error) {
      console.error('Error adding action item:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/meetings/${meetingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        setMeeting({ ...meeting, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCancelMeeting = async () => {
    if (!confirm('Are you sure you want to cancel this meeting?')) return;
    
    try {
      const res = await fetch(`/api/meetings/${meetingId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        router.push('/dashboard/meetings');
      }
    } catch (error) {
      console.error('Error cancelling meeting:', error);
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  if (!meeting) {
    return <div className={styles.container}><p>Meeting not found</p></div>;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/dashboard/meetings" className={styles.backLink}>&larr; Back to Meetings</Link>
        
        <div className={styles.titleRow}>
          <h1>{meeting.title}</h1>
          <span className={`${styles.status} ${styles[meeting.status.toLowerCase()]}`}>
            {meeting.status}
          </span>
        </div>
        
        <p className={styles.meta}>
          {formatDate(meeting.startTime)} - {formatDate(meeting.endTime)}
        </p>
        
        <p className={styles.with}>
          With: <strong>{meeting.teacher.name}</strong>
        </p>
      </div>

      <div className={styles.actions}>
        {meeting.status === 'REQUESTED' && user?.id === meeting.studentId && (
          <Button onClick={() => handleStatusChange('CONFIRMED')}>
            Confirm Meeting
          </Button>
        )}
        {meeting.status === 'CONFIRMED' && user?.id === meeting.teacherId && (
          <Button onClick={() => handleStatusChange('IN_PROGRESS')}>
            Start Meeting
          </Button>
        )}
        {meeting.status === 'IN_PROGRESS' && user?.id === meeting.teacherId && (
          <Button onClick={() => handleStatusChange('COMPLETED')}>
            Complete Meeting
          </Button>
        )}
        {['REQUESTED', 'CONFIRMED'].includes(meeting.status) && (
          <Button variant="outline" onClick={handleCancelMeeting}>
            Cancel Meeting
          </Button>
        )}
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Notes</h2>
          
          <form onSubmit={handleAddNote} className={styles.addForm}>
            <Textarea
              placeholder="Add a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <Button type="submit" disabled={submitting || !newNote.trim()}>
              Add Note
            </Button>
          </form>
          
          <div className={styles.list}>
            {notes.length === 0 ? (
              <p className={styles.empty}>No notes yet</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className={styles.noteItem}>
                  <p>{note.content}</p>
                  <span className={styles.noteMeta}>
                    {note.author.name} • {formatDate(note.createdAt)}
                    {note.isPrivate && ' • Private'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Action Items</h2>
          
          <form onSubmit={handleAddActionItem} className={styles.addForm}>
            <input
              type="text"
              placeholder="Add an action item..."
              value={newActionItem}
              onChange={(e) => setNewActionItem(e.target.value)}
              className={styles.input}
            />
            <Button type="submit" disabled={submitting || !newActionItem.trim()}>
              Add Task
            </Button>
          </form>
          
          <div className={styles.list}>
            {actionItems.length === 0 ? (
              <p className={styles.empty}>No action items yet</p>
            ) : (
              actionItems.map((item) => (
                <div key={item.id} className={styles.actionItem}>
                  <span className={item.status === 'COMPLETED' ? styles.completed : ''}>
                    {item.title}
                  </span>
                  <span className={styles.actionMeta}>
                    {item.assignee.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}