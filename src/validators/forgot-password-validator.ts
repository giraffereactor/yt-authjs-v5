import * as v from "valibot";

export const ForgotPasswordSchema = v.object({
  email: v.pipe(
    v.string("Your email must be a string."),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted."),
  ),
});

export type ForgotPasswordInput = v.InferInput<typeof ForgotPasswordSchema>;
