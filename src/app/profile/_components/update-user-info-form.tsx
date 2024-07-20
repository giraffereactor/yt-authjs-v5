"use client";

import { updateUserInfoAction } from "@/actions/update-user-info-action";
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
import {
  type UpdateUserInfoInput,
  UpdateUserInfoSchema,
} from "@/validators/update-user-info-validator";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { PencilIcon } from "lucide-react";
import { type User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UpdateUserInfoFormProps = { user: User };

export const UpdateUserInfoForm = ({ user }: UpdateUserInfoFormProps) => {
  const [success, setSuccess] = useState("");
  const { data: session, update } = useSession();
  const router = useRouter();

  const { id, name: defaultName } = user;

  const form = useForm<UpdateUserInfoInput>({
    resolver: valibotResolver(UpdateUserInfoSchema),
    defaultValues: { id, name: defaultName || "" },
  });

  const { handleSubmit, control, formState, setError } = form;

  const submit = async (values: UpdateUserInfoInput) => {
    const res = await updateUserInfoAction(values);

    if (res.success) {
      const updatedUser = res.data;

      if (session?.user) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: updatedUser.name,
          },
        });
      }

      router.refresh();
      setSuccess("User information updated successfully.");
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error.nested;

          for (const key in nestedErrors) {
            setError(key as keyof UpdateUserInfoInput, {
              message: nestedErrors[key]?.[0],
            });
          }
          break;
        case 401:
        case 500:
        default:
          const error = res.error || "Internal Server Error";
          setError("name", { message: error });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-yellow-600 transition-colors hover:bg-yellow-600/80"
        >
          <PencilIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>

          <DialogDescription>
            Update your user information below.
          </DialogDescription>

          <div className="my-2 h-1 bg-muted" />

          <Form {...form}>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {success && (
                <p className="text-sm font-medium text-green-600">{success}</p>
              )}

              <FormField name="id" render={() => <FormMessage />} />

              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full"
              >
                Update
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
