/*This code defines a validation schema for user data using the zod library, which facilitates schema definition and validation in TypeScript environments. The userSchema object specifies the rules for validating user-related information:

name: A string that must be at least 3 characters long and cannot exceed 255 characters. If the name does not meet these criteria, an error message "Name is required." is displayed.
username: Similar to name, it must be a string with a minimum length of 3 characters and a maximum of 255 characters. The error message for failing to meet this requirement is "Username is required."
password: It is defined as an optional field that can also be an empty string. The password must be at least 6 characters long but no more than 255 characters if provided. The validation error "Password must be at least 6 characters." is shown if the criteria are not met.
role: A string that needs to be at least 3 characters in length and no longer than 10 characters. The error message "Role is required." will be shown if the validation fails.
Overall, this schema is structured to ensure that user data conforms to specific standards regarding the length and presence of critical fields like name, username, password, and role, enhancing data integrity and security for user management processes.*/

import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required.").max(255),
  username: z.string().min(3, "Username is required").max(255),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "Role is required.").max(10),
});
