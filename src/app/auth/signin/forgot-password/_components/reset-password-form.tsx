"use client";

import { resetPasswordAction } from "@/actions/reset-password-action";
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
import {
  type ResetPasswordInput,
  ResetPasswordSchema,
} from "@/validators/reset-password-validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type ResetPasswordFormProps = { email: string; token: string };

export const ResetPasswordForm = ({ email, token }: ResetPasswordFormProps) => {
  const router = useRouter();

  const form = useForm<ResetPasswordInput>({
    resolver: valibotResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control, formState, setError } = form;

  const submit = async (values: ResetPasswordInput) => {
    const res = await resetPasswordAction(email, token, values);

    if (res.success) {
      router.push("/auth/signin/reset-password/success");
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested;

          for (const key in nestedErrors) {
            setError(key as keyof ResetPasswordInput, {
              message: nestedErrors[key]?.[0],
            });
          }
          break;
        case 401:
          setError("confirmPassword", { message: res.error });
          break;
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("confirmPassword", { message: error });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className="max-w-[400px] space-y-6">
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
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
