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

const TariffForm = () => {
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

      await axios.post("/api/tariffs", values);
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
            render={({ field }) => (
              <SimpleMdeReact placeholder="Description" {...field} />
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status..." />
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TariffForm;
