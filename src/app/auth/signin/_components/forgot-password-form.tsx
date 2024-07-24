"use client";

import { forgotPasswordAction } from "@/actions/forgot-password-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/validators/forgot-password-validator";
import type { ForgotPasswordInput } from "@/validators/forgot-password-validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ForgotPasswordForm = () => {
  const [success, setSuccess] = useState("");

  const form = useForm<ForgotPasswordInput>({
    resolver: valibotResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit, control, formState, setError } = form;

  const submit = async (values: ForgotPasswordInput) => {
    setSuccess("");

    const res = await forgotPasswordAction(values);

    if (res.success) {
      setSuccess("Password reset email sent.");
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested;

          if (nestedErrors && "email" in nestedErrors) {
            setError("email", { message: nestedErrors.email?.[0] });
          } else {
            setError("email", { message: "Internal Server Error" });
          }
          break;
        case 401:
          setError("email", { message: res.error });
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("email", { message: error });
      }
    }
  };

  return (
    <Dialog>
      Forgot your password? Click{" "}
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="px-0">
          here
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your Email</DialogTitle>

          <DialogDescription>
            We will send you an email with a link to reset your password.
          </DialogDescription>

          <div className="my-2 h-1 bg-muted" />

          <Form {...form}>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} disabled={!!success} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {success && (
                <p className="text-sm font-medium text-green-600">{success}</p>
              )}

              <Button
                type="submit"
                disabled={formState.isSubmitting || !!success}
                className="w-full"
              >
                Send Password Reset Email
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
