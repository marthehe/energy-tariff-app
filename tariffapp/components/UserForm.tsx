/*This code outlines a React component named UserForm, designed to create or update user information within a web application. It leverages several React libraries and custom UI components to achieve a clean and functional user interface for form handling.

Key aspects of the UserForm component include:

State Management: Utilizes useState to manage form submission status (isSubmitting) and to store any errors that occur during the form submission process (error).

Form Validation: Integrates zod for schema-based form validation, ensuring that user input adheres to specified validation rules before submission.

Form Handling: Employs react-hook-form for managing form states and events, enhancing form handling efficiency with features like automatic form validation.

Custom UI Components: Uses custom form and input components (e.g., Form, FormField, Input, Select) for a consistent and styled user interface. These components are part of a custom UI library defined in ./ui.

Conditional Rendering: Depending on whether a user prop is provided, the form adjusts to either create a new user or update an existing user's information. This includes modifying form field default values and the submit button text.

Role Selection: Incorporates a Select component to choose the user's role (ADMIN or USER), demonstrating a more interactive form element for role assignment.

API Integration: Uses axios for sending HTTP requests (POST for creating and PATCH for updating users) to the server-side API based on the form submission context.

Navigation and Refresh: Leverages Next.js's useRouter for navigating to a specific route upon successful form submission and optionally refreshing the page to reflect the latest changes.

The overall structure and logic encapsulate both form construction and handling logic within a single component, making it a reusable and modular part of the application's user management system.*/

"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { userSchema } from "@/ValidationSchemas/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      if (user) {
        await axios.patch("/api/users/" + user.id, values);
      } else {
        await axios.post("/api/users", values);
      }
      setIsSubmitting(false);
      router.push("/tariffs");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Unknown Error Occured.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Users Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a Username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={user ? false : true}
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Role..."
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
      </Form>
      <p className=" text-destructive">{error}</p>
    </div>
  );
};

export default UserForm;
