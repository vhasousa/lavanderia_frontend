// AuthContextTypes.ts
export interface AuthState {
    isLoggedIn: boolean;
    userID: string | null;
    role: string | null;
  }
  
  export interface AuthContextType extends AuthState {
    setAuthInfo: (authInfo: Omit<AuthState, 'isLoggedIn'>) => void;
    logout: () => void;
  }
  