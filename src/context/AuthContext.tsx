"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  refreshAuth: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isDashboardRoute = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/teachers') ||
                          pathname === '/login' ||
                          pathname === '/register';

  const refreshAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'DELETE' });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthCheck() {
  const pathname = usePathname();
  
  const isPublicPage = [
    '/', '/home', '/about-us', '/about-two', '/why-choose-us',
    '/study-in-russia', '/russian-language-courses', '/contact', '/career'
  ].includes(pathname || '');

  const isAuthPage = pathname === '/login' || pathname === '/register';
  
  const isDashboardPage = pathname?.startsWith('/dashboard') || pathname === '/teachers';

  return { isPublicPage, isAuthPage, isDashboardPage };
}