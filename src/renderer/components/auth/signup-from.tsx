import { Button } from "@renderer/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@renderer/components/ui/card";
import { Input } from "@renderer/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupFormSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

export type ErrorType = {
  message: string;
};

export function SignupForm() {
  const navigate = useNavigate();
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmitSignupForm(values: z.infer<typeof signupFormSchema>) {
    try {
      const result = await window.electron.signUp({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (result.success) {
        // Redirect to the main app or dashboard
        navigate("/dashboard");
      } else {
        signupForm.setError("password", {
          message: result.error,
        });
      }
    } catch (error) {
      signupForm.setError("password", {
        message: (error as ErrorType).message,
      });
    }
  }
  return (
    <Card className="mx-auto max-w-sm">
      <Form {...signupForm}>
        <form onSubmit={signupForm.handleSubmit(onSubmitSignupForm)}>
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
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
                control={signupForm.control}
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
            </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p className="!mt-0">Creating account</p>
                </>
              ) : (
                <p>Create account</p>
              )}
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
