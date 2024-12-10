import DB from "@/db/db";
import { User } from "@/types/db";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useMemo } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const checkAuth = async () => {
      try {
        const auth = await DB.auth.isAuthenticated();
        const users = await DB.users.list();

        // Early exit if the effect is aborted
        if (controller.signal.aborted) return;

        setIsAuthenticated(auth);
        console.log("User is authenticated:", auth);
        console.log("Users:", users);

        // Redirect logic
        if (!auth) {
          if (users.length === 0) {
            navigate({ to: "/register" });
          } else {
            navigate({ to: "/login" });
          }
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
      }
    };

    checkAuth();

    // Cleanup function to abort the effect if component unmounts
    return () => controller.abort();
  }, [navigate]);

  const register = useCallback(async (user: Omit<User, "id">) => {
    try {
      const userId = await DB.users.create(user);
      console.log("User created with id", userId);
      await login(userId, "/onboarding");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }, []);

  const login = useCallback(async (userId: string, callbackUrl?: string) => {
    try {
      await DB.auth.setCurrentUser(userId);
      setIsAuthenticated(true);
      navigate({ to: callbackUrl ? callbackUrl : "/" });
    } catch (error) {
      console.error("Error during login:", error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await DB.auth.clearCurrentUser();
      setIsAuthenticated(false);
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [navigate]);

  // Memoize the returned object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      register,
    }),
    [isAuthenticated, login, logout, register],
  );
}
