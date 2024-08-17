import { z } from "zod";
import { useAuthActions } from "@convex-dev/auth/react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { passAuthFlowSchema } from "@/components/auth/schemas";
import { useQuery } from "convex-helpers/react/cache/hooks";

export function useAuthentication() {
  const { signIn, signOut } = useAuthActions();

  const onSubmitLoginForm = async (
    provider: "google" | "password",
    values?: z.infer<typeof passAuthFlowSchema>,
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
    values: z.infer<typeof passAuthFlowSchema>,
  ) => {
    try {
      await signIn("password", values);
    } catch (error) {
      console.log("sign in error", error);
      return error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return { onSubmitLoginForm, handleSignOut };
}

export function useUser() {
  let user;
  user = useQuery(api.user.currentUser);
  return { user };
}
