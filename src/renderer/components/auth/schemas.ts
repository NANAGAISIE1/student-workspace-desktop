"use client";

import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signupFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
