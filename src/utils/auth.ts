
import { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

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

// Flag to toggle between demo mode and Firebase
// Set to true for demo mode, false for Firebase integration
// This can be controlled by an environment variable in a real app
const DEMO_MODE = true;

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
    return !!auth.currentUser;
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
    const user = auth.currentUser;
    if (user) {
      // We need to fetch the user's custom claims/data from Firestore
      // For now, return a basic object until we fetch the complete profile
      return {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        role: 'therapist' // Default role, should be fetched from Firestore
      };
    }
    return null;
  }
};

export const logout = async (): Promise<void> => {
  if (DEMO_MODE) {
    localStorage.removeItem('user');
    window.location.href = '/login';
  } else {
    await signOut(auth);
    window.location.href = '/login';
  }
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Fetch user info from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as Omit<User, 'uid'>;
        const userInfo: User = {
          uid: user.uid,
          ...userData
        };
        // Store in localStorage for consistent interface with demo mode
        localStorage.setItem('user', JSON.stringify(userInfo));
        return true;
      } else {
        console.error('User document not found in Firestore');
        await signOut(auth);
        return false;
      }
    } catch (error) {
      console.error('Firebase login error:', error);
      return false;
    }
  }
};

// New method to create a user (for admin use)
export const createUser = async (email: string, password: string, name: string, role: 'admin' | 'therapist'): Promise<boolean> => {
  if (DEMO_MODE) {
    // Just simulate user creation in demo mode
    console.log('Demo mode: User creation simulated', { email, name, role });
    return true;
  } else {
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        role
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
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as Omit<User, 'uid'>;
          callback({
            uid: firebaseUser.uid,
            ...userData
          });
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }
};
