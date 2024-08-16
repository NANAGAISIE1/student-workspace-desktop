import { Password } from "@convex-dev/auth/providers/Password";
import { ConvexError } from "convex/values";
import { z } from "zod";
import { DataModel } from "../_generated/dataModel";
import { ResendOTPPasswordReset } from "./reset_password";
import { ResendOTP } from "./verify_email";

const ParamsSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(16),
});

export default Password<DataModel>({
  profile(params) {
    const { error, data } = ParamsSchema.safeParse(params);
    if (error) {
      throw new ConvexError(error.format());
    }
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
  reset: ResendOTPPasswordReset,
  verify: ResendOTP,
});
