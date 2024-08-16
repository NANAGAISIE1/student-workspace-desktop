import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import Password from "./credentials_login";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Google, Password],
});
