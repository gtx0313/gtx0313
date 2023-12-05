import create from 'zustand';
import { authClient } from '../_firebase/firebase_client';

type State = {
  isInitialized: boolean;
  isAuthenticated: boolean;

  streamFirebaseUser: () => void;
};

export const useAuthStore = create<State>((set) => ({
  isInitialized: false,
  isAuthenticated: false,

  streamFirebaseUser: () => {
    authClient.onAuthStateChanged((u: any) => {
      console.log('streamAuthStateChanged zustand', u);
      set((state) => {
        return { ...state, isAuthenticated: u ? true : false, isInitialized: true };
      });
    });
  }
}));
