/*This code defines an asynchronous POST function intended to be used as an API route handler in a Next.js application for creating new user entries. 
It integrates several key technologies and practices for secure and validated user creation, including Prisma for database interaction, bcryptjs for password hashing, and next-auth for session management. Here's a detailed overview:

Authentication and Authorization: Before processing the user creation, the function verifies that the request is made by an authenticated and authorized user. 
It utilizes next-auth to obtain the session and checks if the session exists and whether the user has an "ADMIN" role. Unauthorized requests are immediately responded to with a 401 status code and an appropriate error message.

Request Body Validation: The incoming request's body is validated against a predefined userSchema using Zod, ensuring that the provided user data meets the application's requirements for user creation. 
If the validation fails, it returns a 400 status code with the validation errors.

Username Uniqueness Check: Queries the database using Prisma to check if the provided username already exists. If a duplicate username is found, it responds with a 409 status code and a message indicating the duplication issue.

Password Hashing: Uses bcryptjs to hash the password with a salt of 10 rounds before saving it to the database. This step ensures that stored passwords are encrypted, enhancing security.

User Creation: With validated and processed data, the function proceeds to create a new user record in the database using Prisma. It spreads the validated body data, including the hashed password, into the data object of the prisma.user.create method.

Response: Upon successful creation of the user, the function returns a 201 status code along with the newly created user object as a JSON response.

Overall, this function encapsulates a secure and robust backend logic for handling new user registrations, emphasizing authentication, authorization, data validation, secure password handling, and proper error responses.*/

import { userSchema } from "@/ValidationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Not Admin." }, { status: 401 });
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: "Duplicate Username" },
      { status: 409 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
