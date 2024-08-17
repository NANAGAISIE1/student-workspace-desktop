import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./schemas";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSidebarStore } from "../sidebar/use-sidebar";
import { useEffect, useState } from "react";
import { useAuthentication } from "@/services/auth-servics";

export function LoginForm() {
  const { closeSidebar } = useSidebarStore((state) => state);
  const { onSubmitLoginForm } = useAuthentication();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    closeSidebar();
  }, []);

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginFormSubmission = async (
    values: z.infer<typeof loginFormSchema>,
  ) => {
    await onSubmitLoginForm("password", values);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await onSubmitLoginForm("google");
    setLoading(false);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(loginFormSubmission)}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link to={"/"} className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={handleGoogleSignIn}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p className="!mt-0">Logging you in</p>
                </>
              ) : (
                <p className="!mt-0">Login with Google</p>
              )}
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={loginForm.formState.isLoading}
            >
              {loginForm.formState.isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p className="!mt-0">Logging you in</p>
                </>
              ) : (
                <p className="!mt-0">Login</p>
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to={"/"} className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
