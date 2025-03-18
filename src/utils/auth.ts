
// Simple auth utility for demo purposes
// In a real app, use a proper authentication library or service

export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem('user');
  return !!user;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};
