import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const session = await window.electron.getSession();
      if (session) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: session, // Adjust this based on your session structure
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  };

  const signOut = async () => {
    try {
      await window.electron.signOut();
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    ...authState,
    checkAuthStatus,
    signOut,
  };
}
