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

export function LoginForm() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmitLoginForm(values: z.infer<typeof loginFormSchema>) {
    // try {
    //   await signIn({
    //     username: values.email,
    //     password: values.password,
    //   });
    //   navigate("/");
    // } catch (error) {
    //   loginForm.setError("password", {
    //     message: (error as ErrorType).message,
    //   });
    // }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmitLoginForm)}>
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
            <Button variant="outline" className="w-full">
              Login with Google
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
