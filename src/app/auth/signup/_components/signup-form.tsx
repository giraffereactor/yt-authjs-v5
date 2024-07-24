"use client";

import { type SignupInput, SignupSchema } from "@/validators/signup-validator";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupUserAction } from "@/actions/signup-user-action";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<SignupInput>({
    resolver: valibotResolver(SignupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const { handleSubmit, control, formState, setError } = form;

  const submit = async (values: SignupInput) => {
    const res = await signupUserAction(values);

    if (res.success) {
      router.push("/auth/signup/success");
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested;

          for (const key in nestedErrors) {
            setError(key as keyof SignupInput, {
              message: nestedErrors[key]?.[0],
            });
          }
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("confirmPassword", { message: error });
      }
    }
  };

  if (success) {
    return (
      <div>
        <p>User successfully created!</p>

        <span>
          Click{" "}
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>{" "}
          to sign in.
        </span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-[400px] space-y-8"
        autoComplete="false"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g. John Smith" {...field} />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g. john.smith@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="e.g. ********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="e.g. ********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full"
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
};
