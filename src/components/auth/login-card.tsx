import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { SignInMethodDivider } from "./sign-in-divider";

export function SignInCard() {
  return (
    <Card className="mx-auto flex w-full max-w-[384px] flex-col gap-4">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto flex w-full flex-col gap-4">
        {/* <div className="flex w-full flex-col items-stretch gap-2 min-[460px]:flex-row">
          <SignInWithGitHub />
          <SignInWithGoogle />
        </div> */}
        <SignInMethodDivider />
        {/* <PasswordLoginForm /> */}
      </CardContent>
    </Card>
  );
}
