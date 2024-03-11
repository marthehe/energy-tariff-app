import React from "react";
import prisma from "@/prisma/db";
import { Tariff } from "@prisma/client";
import TariffDetail from "./TariffDetail";

interface Props {
  params: { id: string };
}

const ViewTariff = async ({ params }: Props) => {
  const tariff = await prisma.tariff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tariff) {
    return <p className=" text-destructive">Tariff Not Found!</p>;
  }

  return <TariffDetail tariff={tariff} />;
};

export default ViewTariff;

/*This code outlines a React component named ViewTariff, designed for use within a Next.js application to fetch and display the details of a specific tariff from a database. 
The component is asynchronous, leveraging Prisma as an ORM (Object-Relational Mapping) to interact with the database. Here's a detailed breakdown of its functionalities:

Imports and Setup: The component imports React, the Prisma client, the Tariff type from Prisma Client to ensure type safety, and a TariffDetail component for presenting the tariff information.

Props Structure: Defines an interface Props to type-check the component's props, expecting an object params containing a id string, which corresponds to the tariff's unique identifier.

Fetching Tariff Data: Uses the Prisma client to query the database for a unique tariff based on the id provided in params. The id is parsed from a string to an integer to match the expected data type for the database query.

Conditional Rendering:

Tariff Not Found: If the query does not return a tariff (i.e., the result is falsy), the component renders a paragraph element with a message "Tariff Not Found!" styled to indicate an error or warning.
Tariff Found: If a tariff is successfully retrieved, it renders the TariffDetail component, passing the fetched tariff object as a prop. This child component is then responsible for displaying the tariff's detailed information.
Export: The ViewTariff component is exported as the default export of the file, making it available for import and use in other parts of the application.

This setup illustrates a typical pattern for fetching and displaying data based on URL parameters in a Next.js application. 
It demonstrates the use of Prisma for database operations, async/await for asynchronous data fetching, and conditional rendering based on the query result. 
The ViewTariff component serves as a bridge between the raw data in the database and a user-friendly interface represented by the TariffDetail component.*/
