import * as v from "valibot";

export const SignupSchema = v.pipe(
  v.object({
    name: v.optional(
      v.union([
        v.pipe(
          v.literal(""),
          v.transform(() => undefined)
        ),
        v.pipe(
          v.string("Your name must be a string."),
          v.nonEmpty("Please enter your name."),
          v.minLength(6, "Your name must have 6 characters or more.")
        ),
      ])
    ),
    email: v.pipe(
      v.string("Your email must be a string."),
      v.nonEmpty("Please enter your email."),
      v.email("The email address is badly formatted")
    ),
    password: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please enter your password."),
      v.minLength(6, "Your password must have 6 characters or more.")
    ),
    confirmPassword: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please confirm your password.")
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match."
    ),
    ["confirmPassword"]
  )
);

export type SignupInput = v.InferInput<typeof SignupSchema>;
