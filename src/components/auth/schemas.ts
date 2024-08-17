import { z } from "zod";

export const passAuthFlowSchema = z.object({
  email: z.string().email(),
  name: z.optional(z.string().min(2)),
  password: z.string().min(8),
  flow: z.enum(["signIn", "signUp"]),
});
