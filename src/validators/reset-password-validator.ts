import * as v from "valibot";

export const ResetPasswordSchema = v.pipe(
  v.object({
    password: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please enter your password."),
      v.minLength(6, "Your password must have 6 characters or more."),
    ),
    confirmPassword: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please confirm your password."),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);

export type ResetPasswordInput = v.InferInput<typeof ResetPasswordSchema>;
