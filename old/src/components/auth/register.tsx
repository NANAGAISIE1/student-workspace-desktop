"use client";
// import { RegistrationForm } from "./forms/password-registration-form";
// import { VerificationForm } from "./forms/password-verification-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { RegistrationForm } from "./form/registeration";

export const PasswordRegistrationCard = () => (
  <Card className="mx-auto flex w-full max-w-[384px] flex-col gap-4">
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
    </CardHeader>
    <CardContent className="mx-auto flex w-full flex-col gap-4">
      {/* <div className="flex w-full flex-col items-stretch gap-2 min-[460px]:flex-row">
        <SignInWithGitHub />
        <SignInWithGoogle />
      </div> */}
      {/* <SignInMethodDivider /> */}
      <RegistrationForm />
    </CardContent>
  </Card>
);
