
// Simple auth utility for demo purposes
// In a real app, use a proper authentication library or service

// Demo accounts
const DEMO_ACCOUNTS = [
  {
    email: 'admin@goodphysio.com',
    password: 'admin123',
    name: 'Administrateur',
    role: 'admin'
  },
  {
    email: 'therapist@goodphysio.com',
    password: 'therapist123',
    name: 'Dr. Jean Dupont',
    role: 'therapist'
  }
];

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

export const login = (email: string, password: string): boolean => {
  const account = DEMO_ACCOUNTS.find(
    acc => acc.email === email && acc.password === password
  );
  
  if (account) {
    const { password, ...userInfo } = account;
    localStorage.setItem('user', JSON.stringify(userInfo));
    return true;
  }
  
  return false;
};
