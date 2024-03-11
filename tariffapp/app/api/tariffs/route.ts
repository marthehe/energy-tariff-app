import { tariffSchema } from "@/ValidationSchemas/tariff";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const validation = tariffSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTariff = await prisma.tariff.create({
    data: { ...body },
  });

  return NextResponse.json(newTariff, { status: 201 });
}

/*This code outlines an asynchronous POST function, intended as an API route handler in a Next.js application for creating new tariff entries. It integrates with several technologies and methodologies to ensure secure, validated, and efficient data handling:

Session Verification: Utilizes next-auth to verify the requester's session. If the session does not exist, indicating the user is not authenticated, 
the function immediately returns a response with a 401 status code and an error message indicating the lack of authentication.

Request Body Validation: Parses the incoming request body into JSON and validates it against a predefined tariffSchema. This validation ensures the incoming data conforms to the expected structure and content for a tariff. 
If the validation fails, it returns a 400 status code along with the formatted validation errors.

Database Interaction: Uses Prisma, an ORM for TypeScript and Node.js, to interact with the database. Upon successful validation, it creates a new tariff entry in the database using the validated data from the request body. 
This operation showcases Prisma's straightforward and promise-based syntax for database CRUD operations.

Success Response: If the new tariff is successfully created, the function returns a 201 status code along with the newly created tariff object in the response. This indicates to the client that the resource was created successfully.

Overall, the function demonstrates a secure and standard approach for handling POST requests within a Next.js application, emphasizing session authentication, data validation, and efficient database interaction to create a new resource.*/
