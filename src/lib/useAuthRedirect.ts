import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';

interface UseAuthRedirectOptions {
  /** Array of allowed roles. If empty, any authenticated user is allowed */
  allowedRoles?: string[];
  /** Default redirect URL for unauthenticated users */
  loginUrl?: string;
  /** URL to redirect to if user role is not in allowedRoles */
  wrongRoleUrl?: string;
  /** Number of retry attempts (default: 2) */
  maxRetries?: number;
  /** Delay between retries in ms (default: 500) */
  retryDelay?: number;
}

interface UseAuthRedirectReturn {
  /** Current user from auth check */
  user: any;
  /** Loading state */
  loading: boolean;
  /** Error if any */
  error: string | null;
  /** Manual trigger to check auth */
  checkAuth: () => Promise<void>;
  /** Force redirect based on role */
  redirectByRole: (role: string) => void;
}

/**
 * Centralized auth redirect hook that handles role-based routing with retry logic
 * Use this in all portal layouts to avoid duplicating redirect logic
 */
export function useAuthRedirect(
  options: UseAuthRedirectOptions = {}
): UseAuthRedirectReturn {
  const {
    allowedRoles = [],
    loginUrl = '/login',
    wrongRoleUrl = '/login',
    maxRetries = 2,
    retryDelay = 500,
  } = options;

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const redirectByRole = useCallback((role: string) => {
    const roleToPath: Record<string, string> = {
      ADMIN: '/admin',
      TEACHER: '/teacher',
      COUNSELOR: '/teacher',
      MENTOR: '/teacher',
      STUDENT: '/student',
    };
    
    const path = roleToPath[role] || '/login';
    router.push(path);
  }, [router]);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current user
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (!data.user) {
        // Not authenticated
        router.push(loginUrl);
        return;
      }

      setUser(data.user);

      // Check role permissions
      if (allowedRoles.length > 0 && !allowedRoles.includes(data.user.role)) {
        // User doesn't have permission - redirect to appropriate portal
        redirectByRole(data.user.role);
        return;
      }

      // Success - user is authenticated and authorized
      // Don't redirect here - let the component render
    } catch (err) {
      console.error('Auth check error:', err);
      setError('Failed to verify authentication');
      
      // Retry if attempts remaining
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          checkAuth();
        }, retryDelay);
        return;
      }
      
      // Max retries exceeded
      router.push(loginUrl);
    } finally {
      setLoading(false);
    }
  }, [allowedRoles, loginUrl, maxRetries, redirectByRole, retryCount, retryDelay, router]);

  // Run auth check on mount
  useEffect(() => {
    if (!user && retryCount === 0) {
      checkAuth();
    }
  }, []);

  return {
    user,
    loading,
    error,
    checkAuth,
    redirectByRole,
  };
}

/**
 * Helper function to get redirect path by role
 */
export function getRedirectPath(role: string): string {
  const roleToPath: Record<string, string> = {
    ADMIN: '/admin',
    TEACHER: '/teacher',
    COUNSELOR: '/teacher',
    MENTOR: '/teacher',
    STUDENT: '/student',
  };
  
  return roleToPath[role] || '/login';
}