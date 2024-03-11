/*This code snippet defines an asynchronous PATCH function intended for use as an API route handler in a Next.js application, specifically for updating user details. 
The function integrates with Prisma for database operations, bcryptjs for password hashing, and utilizes a user schema for validation purposes. Here's an outline of its core functionalities:

Request Validation: Upon receiving a PATCH request, it first parses the request body into JSON format and validates it against a predefined userSchema to ensure all required fields meet the specified criteria. 
If validation fails, it responds with a 400 status code and detailed validation errors.

User Lookup: Attempts to find an existing user in the database based on the id provided in the request parameters. If no user is found matching the provided id, it returns a 404 response indicating "User Not Found".

Password Handling: If the request body includes a password field and it's not empty, the password is hashed using bcryptjs before being updated in the database. 
If a password is not provided or is empty, the password field is removed from the body to prevent overwriting the existing password with null or an empty string.

Username Duplication Check: Before updating the user, it checks if the username provided in the request body is different from the existing one. If it is, the function checks for username duplication in the database. 
If a duplicate username is found, it returns a 409 response indicating "Duplicate Username".

User Update: Updates the user's details in the database with the data provided in the request body, excluding any null password updates. This operation is performed using Prisma's user.update method.

Success Response: If the user is successfully updated, it returns the updated user object in the response.

This function effectively handles the user update process, including validation, password hashing, and checking for duplicate usernames, ensuring data integrity and security. 
It responds appropriately based on the outcome of each step, providing clear feedback for both successful updates and various error scenarios.*/

import { userSchema } from "@/ValidationSchemas/users";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  if (body?.password && body.password != "") {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });
    if (duplicateUsername) {
      return NextResponse.json(
        { message: "Duplicate Username" },
        { status: 409 }
      );
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateUser);
}
