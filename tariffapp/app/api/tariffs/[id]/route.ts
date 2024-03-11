/*This code outlines two asynchronous API route handlers, PATCH and DELETE, designed for updating and deleting tariff entries, respectively, within a Next.js application using Prisma ORM for database operations.

PATCH Function:
Purpose: Updates specific details of an existing tariff entry based on the provided request body and an id parameter.
Validation: Parses and validates the request body against tariffSchema to ensure data integrity. If the validation fails, it returns a 400 status code along with the validation errors.
Tariff Lookup: Searches for the tariff using the id provided in params. If the tariff doesn't exist, it returns a 404 status code with an error message indicating the tariff was not found.
Data Processing: If assignedToUserId is present in the body, it's parsed into an integer to ensure data type consistency.
Database Update: Updates the tariff entry in the database using Prisma, applying the validated and processed request body data. Returns the updated tariff object with a 200 status code upon success.

DELETE Function:
Purpose: Deletes an existing tariff entry identified by the id parameter.
Tariff Lookup: Similar to the PATCH function, it first checks if the tariff exists in the database. If not found, it returns a 404 status code with an appropriate error message.
Deletion: If the tariff exists, it proceeds to delete the entry from the database using Prisma. After successful deletion, it returns a confirmation message indicating the tariff has been deleted.

Common Aspects:
Interface Props: Both functions use a shared Props interface to type-check the expected shape of params, ensuring that an id string is provided.
Prisma ORM: Utilizes Prisma for interacting with the database, showcasing how to perform find and update/delete operations in a type-safe manner.
Error Handling and Responses: Each function includes error handling for non-existent resources and validation failures, providing clear feedback through HTTP status codes and JSON messages.
Overall, these handlers demonstrate how to securely and efficiently update and delete database records in a Next.js application, following RESTful API principles and best practices for server-side operations.*/

import { tariffSchema } from "@/ValidationSchemas/tariff";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  const validation = tariffSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const tariff = await prisma.tariff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tariff) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  const updateTariff = await prisma.tariff.update({
    where: { id: tariff.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updateTariff, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const tariff = await prisma.tariff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tariff) {
    return NextResponse.json({ error: "Tariff Not Found" }, { status: 404 });
  }

  await prisma.tariff.delete({
    where: { id: tariff.id },
  });

  return NextResponse.json({ message: "Tariff Deleted" });
}
