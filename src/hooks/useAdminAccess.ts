import { useState, useCallback } from 'react';

const ADMIN_PASSWORD = 'nico2025'; // 可以改成你想要的密码
const SESSION_KEY = 'cat-weight-admin-access';

export function useAdminAccess() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const verifyPassword = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  return { isAdmin, verifyPassword, logout };
}
