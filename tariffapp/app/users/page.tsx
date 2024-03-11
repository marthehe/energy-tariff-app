// Importing UserForm component for rendering user forms
import UserForm from "@/components/UserForm";
// Import React for building components
import React from "react";
// Importing prisma client for database interactions
import prisma from "@/prisma/db";
// Importing DataTableSimple component for displaying users in a table format
import DataTableSimple from "./data-table-simple";
// Importing getServerSession from next-auth for session handling on server-side
import { getServerSession } from "next-auth";
// Importing options for the next-auth configuration
import options from "../api/auth/[...nextauth]/options";

// Defining the Users component as an asynchronous function
const Users = async () => {
  // Fetching the current session to check user authentication and role
  const session = await getServerSession(options);

  // Checking if the logged-in user has the ADMIN role

  if (session?.user.role !== "ADMIN") {
    // If the user is not an ADMIN, render a message indicating restricted access
    return <p className="text-destructive">Admin access required.</p>;
  }
  // If the user is an ADMIN, fetch all users from the database using Prisma client
  const users = await prisma.user.findMany();

  // Rendering the UserForm component and the DataTableSimple component passing the fetched users as a prop

  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;

//This code defines an asynchronous React component called Users for a web application. It utilizes Next.js for server-side session handling and Prisma ORM for database interactions.
//The component checks if the current session's user has the "ADMIN" role. If not, it displays a message restricting access.
//For users with the "ADMIN" role, it fetches all users from the database and renders a form for user management (UserForm) along with a data table (DataTableSimple) displaying the users
