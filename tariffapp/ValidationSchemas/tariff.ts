import { z } from "zod";

export const tariffSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  price: z.string().min(1, "Price is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  Status: z.string().min(1, "Status").max(10).optional(),
});
