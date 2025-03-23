
import React, { createContext, useContext, ReactNode } from 'react';
import { db, storage } from '@/lib/firebase';
import { User } from '@/utils/auth';

interface FirebaseContextType {
  db: typeof db;
  storage: typeof storage;
  currentUser: User | null;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: ReactNode;
  currentUser: User | null;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ 
  children, 
  currentUser 
}) => {
  const value = {
    db,
    storage,
    currentUser
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
