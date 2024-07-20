import * as v from "valibot";

export const UpdateUserInfoSchema = v.object({
  id: v.pipe(
    v.string("Your id must be a string."),
    v.uuid("Your id must be a valid UUID."),
  ),
  name: v.pipe(
    v.string("Your name must be a string"),
    v.nonEmpty("Please enter your name."),
    v.minLength(6, "Your name must have 6 characters or more."),
  ),
});

export type UpdateUserInfoInput = v.InferInput<typeof UpdateUserInfoSchema>;
