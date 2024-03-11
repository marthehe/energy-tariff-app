/*This code defines a React component named DataTable, designed to display a list of tariffs in a tabular format. The component utilizes custom table components to organize and present tariff data, 
which includes details such as name, description, status, creation date, and last update date. Here's an overview of its structure and functionality:

Import Statements: The component imports necessary UI components for constructing the table (Table, TableBody, TableCell, TableHead, TableHeader, TableRow) from a custom UI library. 
It also imports the Tariff type from Prisma Client to type-check the tariffs prop, ensuring it receives an array of Tariff objects.

Props Definition: The component expects a single prop, tariffs, which is an array of Tariff objects. Each Tariff object represents a tariff entity from the database, fetched via Prisma Client.

Table Structure: The component renders a table with a header (TableHeader) and body (TableBody). The header defines columns for tariff name, description, status, created at date, and updated at date. 
The body maps over the tariffs array, rendering a row (TableRow) for each tariff with corresponding data in cells (TableCell).

Dynamic Data Rendering: Each tariff's name is wrapped in a Link component, enabling navigation to a detail view of the tariff when clicked. The href attribute of the Link dynamically incorporates the tariff's ID for URL path construction. 
Other tariff details (description, status, creation date, and update date) are directly displayed in their respective table cells.

Date Formatting: The createdAt and updatedAt dates are converted to a local date string format using toLocaleDateString(), making the dates more readable and localized.

Conditional Rendering: The component includes a conditional check to render the table body content only if the tariffs array is provided, preventing errors in cases where the data might be unavailable or not yet fetched.

Styling: The outer div and the table itself are styled using Tailwind CSS for full width (w-full), top margin (mt-5), rounded borders (rounded-md), and conditional border styling for small and above screens (sm:border).

Overall, the DataTable component serves as a reusable and neatly organized way to display a list of tariffs, enhancing the user interface by providing essential tariff information in an accessible and interactive format.*/

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tariff } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  tariffs: Tariff[];
}

const DataTable = ({ tariffs }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tariffs
              ? tariffs.map((tariff) => (
                  <TableRow key={tariff.id} data-href="/">
                    <TableCell>
                      <Link href={`/tariffs/${tariff.id}`}>{tariff.name}</Link>{" "}
                    </TableCell>
                    <TableCell>{tariff.description} </TableCell>
                    <TableCell>{tariff.status} </TableCell>
                    <TableCell>
                      {tariff.createdAt.toLocaleDateString()}{" "}
                    </TableCell>
                    <TableCell>
                      {tariff.updatedAt.toLocaleDateString()}{" "}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
