/*This code defines a React component named TariffDetail, intended for displaying detailed information about a specific tariff. The component leverages a Tariff type from Prisma Client, 
suggesting it is part of an application that uses Prisma for database operations. Here's an overview of its structure and functionality:

Props: The component expects a single prop, tariff, which is an object of the type Tariff. This object contains information about the tariff, such as its name, description, status, creation date, and last update date.

Layout and Styling: Utilizes a grid layout for larger screens (lg:grid) to organize the content into columns, with the main card taking up most of the space (lg:col-span-3) and action buttons (edit and delete) in a separate column.

Card Component: Uses custom card components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter) from a UI library to structure the tariff information in a visually appealing manner. 
Each part of the card is dedicated to displaying specific pieces of information about the tariff.

Status Display: The tariff's status is displayed at the top of the card, indicating whether it is active, inactive, or in any other state defined within the application's logic.

Formatted Dates: The creation and update dates are formatted and displayed using toLocaleDateString, providing a localized representation of these timestamps.

Markdown Support: The tariff description, potentially stored in Markdown format for rich text features, is rendered using ReactMarkDown, ensuring that any Markdown content is properly converted into HTML.

Action Buttons: Includes an Edit Tariff link styled with buttonVariants for consistent theming with other buttons and a DeleteButton component for removing the tariff. The edit link navigates to a route for editing the tariff, using its ID in the URL path.

Delete Functionality: The DeleteButton component, although not detailed here, presumably handles the deletion of the tariff, further indicating that the TariffDetail component is part of a CRUD (Create, Read, Update, Delete) interface within the application.

Overall, TariffDetail provides a comprehensive view of a tariff's details, formatted and styled for clarity, with options for editing or deleting the tariff, contributing to a functional and user-friendly interface within the application.*/

import { Tariff } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReactMarkDown from "react-markdown";
import DeleteButton from "./DeleteButton";

interface Props {
  tariff: Tariff;
}

const TariffDetail = ({ tariff }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <div>{tariff.status} </div>
          </div>
          <CardTitle>{tariff.name}</CardTitle>
          <CardDescription>
            Created:{" "}
            {tariff.createdAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkDown>{tariff.description}</ReactMarkDown>
        </CardContent>
        <CardFooter>
          Updated:{" "}
          {tariff.updatedAt.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link
          href={`/tariffs/edit/${tariff.id}`}
          className={`${buttonVariants({
            variant: "default",
          })}`}
        >
          Edit Tariff
        </Link>
        <DeleteButton tariffId={tariff.id} />
      </div>
    </div>
  );
};

export default TariffDetail;
