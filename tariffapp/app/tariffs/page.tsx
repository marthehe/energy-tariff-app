// Importing React to use JSX and define components
import React from "react";
// Importing prisma client for database operations, specifically configured for the app's database
import prisma from "@/prisma/db";
// Importing DataTable component to display tariff data in tabular format
import DataTable from "./DataTable";
// Importing Link from next/link for client-side transitions between routes
import Link from "next/link";
// Importing buttonVariants function to get class names for button styles based on variant
import { buttonVariants } from "@/components/ui/button";

// Defining Tariffs as an asynchronous function component
const Tariffs = async () => {
  // Fetching all tariffs from the database using Prisma client
  const tariffs = await prisma.tariff.findMany();

  return (
    <div>
      /* Rendering a Link component to navigate to the page for creating new
      tariffs. The className is dynamically determined by the buttonVariants
      function for styling. */
      <Link
        href="/tariffs/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      /* Rendering the DataTable component, passing the fetched tariffs as a
      prop to display them */
      <DataTable tariffs={tariffs} />
    </div>
  );
};

export default Tariffs;

//This code defines a component named Tariffs that interacts with a database to fetch and display tariff information.
//It uses the Prisma client for database queries to retrieve all tariffs, then displays them in a DataTable component.
//There's also a link to navigate to a form for creating new tariffs, styled with the help of a buttonVariants function to apply consistent button styling across the application.
//The use of asynchronous function indicates that the component fetches data from the database during its execution.
