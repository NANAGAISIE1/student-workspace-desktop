import { z } from "zod";
import { useAuthActions } from "@convex-dev/auth/react";
import { loginFormSchema } from "@/components/auth/schemas";
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

type ErrorType = {
  message: string;
};

export function useAuthentication() {
  const { signIn, signOut } = useAuthActions();

  const onSubmitLoginForm = async (
    provider: "google" | "password",
    values?: z.infer<typeof loginFormSchema>,
  ) => {
    if (values) {
      return await handlePasswordSignIn(values);
    }
    switch (provider) {
      case "google":
        return await handleOAuthSignIn("google");
    }
  };

  const handleOAuthSignIn = async (provider: "google") => {
    const { redirect } = await signIn(provider);
    const url = redirect?.toString();

    if (url) {
      window.open(url, "_self");
    } else {
      toast.error("Failed to sign in");
    }
  };

  const handlePasswordSignIn = async (
    values: z.infer<typeof loginFormSchema>,
  ) => {
    try {
      await signIn("password", {
        username: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
      return error as ErrorType;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign out");
    }
  };

  return { onSubmitLoginForm, handleSignOut };
}

export function useUser() {
  const user = useQuery(api.user.currentUser);
  console.log(user);
  return { user };
}
