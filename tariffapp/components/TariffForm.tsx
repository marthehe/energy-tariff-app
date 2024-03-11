/*This code details a React component named TariffForm designed for creating or updating tariff information. The form leverages react-hook-form for form handling and validation, zod for schema definition, and integrates with an API using axios for data submission. 
Here's a breakdown of its features and functionality:

State Management: Utilizes useState to manage form submission status (isSubmitting) and display any errors (error).

Form Validation: Uses zod to define a validation schema (tariffSchema) for tariff data, ensuring inputs meet specified requirements.

Form Handling: Employs react-hook-form enhanced with zodResolver for seamless integration of zod validation. This setup provides efficient form state management and validation feedback.

Custom Input Components: Includes custom UI components (e.g., Input, Button) and third-party components like SimpleMdeReact for a markdown editor and @radix-ui/react-select for custom select inputs. 
These components are styled and used for form fields like name, description, and status.

Conditional Form Behavior: The form adapts to either create a new tariff or update an existing one based on the presence of a tariff prop, modifying API requests (POST for creation and PATCH for updates) and form default values accordingly.

Navigation and Feedback: After successful form submission, navigates to a list view of tariffs and provides immediate UI feedback by refreshing the page. Error handling is implemented to display messages to the user in case of API request failures.

UI Styling: Styles are applied for visual enhancement, including rounded borders and padding around the form, and error messages are styled for visibility.

Overall, TariffForm encapsulates the functionality required for managing tariff data within a web application, providing an intuitive interface for users to input data, validated against predefined rules, 
and seamlessly integrated with backend services for data persistence.*/

"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { tariffSchema } from "@/ValidationSchemas/tariff";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Tariff } from "@prisma/client";

type TariffFormData = z.infer<typeof tariffSchema>;

interface Props {
  tariff?: Tariff;
}

const TariffForm = ({ tariff }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const form = useForm<TariffFormData>({
    resolver: zodResolver(tariffSchema),
  });

  async function onSubmit(values: z.infer<typeof tariffSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      if (tariff) {
        await axios.patch(`/api/tariffs/` + tariff.id, values);
        return;
      } else {
        await axios.post("/api/tariffs", values);
      }

      setIsSubmitting(false);
      router.push("/tariffs");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Unknown Error");
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
            defaultValue={tariff?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tariff Name</FormLabel>
                <FormControl>
                  <Input placeholder="Tariff Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            defaultValue={tariff?.description}
            render={({ field }) => (
              <SimpleMdeReact placeholder="Description" {...field} />
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={tariff?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Status..."
                          defaultValue={tariff?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NOT ACTIVE"> NOT ACTIVE </SelectItem>
                      <SelectItem value="ACTIVE"> ACTIVE </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {tariff ? "Update Tariff" : "Create Tariff"}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
};

export default TariffForm;
