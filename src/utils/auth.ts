
import { 
  doc, 
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Demo accounts - kept for backward compatibility
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

// Flag to toggle between demo mode and Firestore
// Set to true for demo mode, false for Firestore integration
const DEMO_MODE = false;

// User type definition
export interface User {
  uid?: string;
  email: string;
  name: string;
  role: 'admin' | 'therapist';
}

export const isAuthenticated = (): boolean => {
  if (DEMO_MODE) {
    const user = localStorage.getItem('user');
    return !!user;
  } else {
    const user = localStorage.getItem('currentUser');
    return !!user;
  }
};

export const getCurrentUser = (): User | null => {
  if (DEMO_MODE) {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  } else {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
};

export const logout = async (): Promise<void> => {
  if (DEMO_MODE) {
    localStorage.removeItem('user');
  } else {
    localStorage.removeItem('currentUser');
  }
  window.location.href = '/login';
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const login = async (email: string, password: string): Promise<boolean> => {
  if (DEMO_MODE) {
    const account = DEMO_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );
    
    if (account) {
      const { password, ...userInfo } = account;
      localStorage.setItem('user', JSON.stringify(userInfo));
      return true;
    }
    
    return false;
  } else {
    try {
      // Query Firestore for a user with this email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.error('User not found');
        return false;
      }
      
      // Get the first user document that matches the email
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      // Check if the password matches
      if (userData.password !== password) {
        console.error('Incorrect password');
        return false;
      }
      
      // Store user information in localStorage
      const userInfo: User = {
        uid: userDoc.id,
        email: userData.email,
        name: userData.name,
        role: userData.role
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      return true;
    } catch (error) {
      console.error('Firestore login error:', error);
      return false;
    }
  }
};

// Create a user (for admin use)
export const createUser = async (email: string, password: string, name: string, role: 'admin' | 'therapist'): Promise<boolean> => {
  if (DEMO_MODE) {
    // Just simulate user creation in demo mode
    console.log('Demo mode: User creation simulated', { email, name, role });
    return true;
  } else {
    try {
      // Check if user email already exists
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        console.error('User with this email already exists');
        return false;
      }
      
      // Create new user document in Firestore
      const newUserRef = doc(collection(db, 'users'));
      await setDoc(newUserRef, {
        email,
        name,
        password, // Store password directly in Firestore (in a real app, hash it!)
        role,
        createdAt: new Date()
      });
      
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }
};

// Function to listen to auth state changes (useful for protected routes)
export const subscribeToAuthChanges = (callback: (user: User | null) => void): () => void => {
  if (DEMO_MODE) {
    // In demo mode, we'll just check localStorage once
    const user = getCurrentUser();
    callback(user);
    return () => {}; // Empty unsubscribe function
  } else {
    // For Firestore mode, we just check localStorage
    const user = getCurrentUser();
    callback(user);
    
    // Create a simple listener for localStorage changes
    const storageListener = () => {
      const updatedUser = getCurrentUser();
      callback(updatedUser);
    };
    
    window.addEventListener('storage', storageListener);
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }
};
