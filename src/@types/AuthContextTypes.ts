// AuthContextTypes.ts
export interface AuthState {
  isLoggedIn: boolean;
  userID: string | null;
  username: string | null;
  role: string | null;
}

export interface AuthContextType extends AuthState {
  setAuthInfo: (authInfo: Omit<AuthState, 'isLoggedIn'>) => void;
  setRole: (role: string | null) => void;
  logout: () => void;
}
