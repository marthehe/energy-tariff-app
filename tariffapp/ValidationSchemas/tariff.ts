/*This code defines a schema for validating tariff data using the zod library, a TypeScript-first schema declaration and validation library. 
The tariffSchema is created using z.object(), indicating that it expects an object with specific properties. Each property of the tariff object—name, description, and status—has its own validation rules:

name: It must be a string, at least 1 character long (ensuring it's not empty) and cannot exceed 255 characters. If these conditions are not met, an error message "Name is required" is returned.
description: Similar to name, it must be a string that is at least 1 character and no more than 65535 characters long, with an appropriate error message "Description is required" if the criteria are not fulfilled.
status: It is an optional string property that, if provided, must be at least 1 character and no more than 10 characters long. 
There is a simple validation message "Status" provided for feedback, which might be used to indicate a validation error related to the status field.
This schema is designed for validating tariff data, potentially upon creation or update, to ensure that all necessary information is provided correctly according to the defined constraints.*/

import { z } from "zod";

export const tariffSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.string().min(1, "Status").max(10).optional(),
});
