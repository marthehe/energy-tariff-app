/*This code defines a React component named DataTableSimple, 
which renders a simple data table displaying a list of users. It leverages custom table components (Table, TableBody, TableCell, TableHead, TableHeader, TableRow) from a UI library located at @/components/ui/table for structured presentation. 
The component is designed to accept a single prop, users, which is an array of User objects fetched from a database via Prisma, an ORM for Node.js & TypeScript.

Key aspects of the DataTableSimple component include:

Props Definition: The component expects a prop named users, which is an array of User objects. Each User object contains user-related information like name, username, and role.

Table Structure: Utilizes custom table components to create a semantic and stylized table. This includes:

TableHeader for the table header section, containing TableRow and TableHead components for header cells with labels "Name", "Username", and "Role".

TableBody for the main content of the table, where user data is dynamically rendered using TableRow and TableCell components.

Dynamic Data Rendering: Maps over the users array to create a row for each user, displaying the user's name, username, and role in individual cells. 
Each piece of data is wrapped in a Link component, enabling navigation to user-specific pages with a dynamic URL structure /users/{user.id}.

Styling: Applies Tailwind CSS classes for styling, such as w-full for full width and mt-5 for margin top. The table and its rows are styled with rounded borders and background colors for differentiation and visual appeal.

Conditional Rendering: Includes a conditional check to render the user rows only if the users array is populated, providing a safeguard against rendering issues if the data is not available.

Overall, DataTableSimple is a reusable component that provides a clean and efficient way to display user data in tabular form within a web application. 
Its use of custom table components and dynamic rendering based on passed-in props makes it a flexible solution for data presentation needs.*/

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import Link from "next/link";

interface Props {
  users: User[];
}

const DataTableSimple = ({ users }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Username</TableHead>
              <TableHead className="font-medium">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((user) => (
                  <TableRow key={user.id} data-href="/">
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.username}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.role}</Link>
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

export default DataTableSimple;
