"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

const registerSchema = z
  .object({
    email: z.email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().trim().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.email,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.replace("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };
  const isPending = form.formState.isSubmitting;
  return (
    <div className="min-w-md max-w-md mx-auto flex items-center justify-center h-screen">
      <Card className="w-full flex flex-col gap-4 items-center">
        <img src="/logos/new-n9n.png" alt="n9n" className="w-12 h-12" />
        <div className="flex flex-col gap-1 text-center">
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to continue</CardDescription>
        </div>
        <CardContent className="w-full">
          <div className="flex gap-3">
            <Button className="flex-1" variant="outline" disabled={isPending}>
              <img
                src="/logos/github.svg"
                alt="github"
                className="w-4 h-4"
                style={{ fill: "#fff" }}
              />
              Login with GitHub
            </Button>
            <Button className="flex-1" variant="outline" disabled={isPending}>
              <img src="/logos/google.svg" alt="google" className="w-4 h-4" />
              Login with Google
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3 mt-6"
              autoComplete="off"
            >
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Sign up
                {isPending && <Loader size={16} />}
              </Button>
            </form>
            <div className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-800 underline">
                Login
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
