import React from "react";
import prisma from "@/prisma/db";
import UserForm from "@/components/UserForm";
import { getServerSession } from "next-auth";
import options from "../../api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin access required.</p>;
  }
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className=" text-destructive">User Not Found.</p>;
  }
  user.password = "";
  return <UserForm user={user} />;
};

export default EditUser;

/*This code defines an asynchronous React component EditUser designed for the Next.js framework, enabling administrative users to edit existing user details. 
The component demonstrates a combination of server-side logic with React's component-based UI rendering. Here’s a breakdown of its key functionalities:

Props and Role Verification: The component expects params as props, containing a user ID (id). It immediately checks the session to ensure that only users with an "ADMIN" role can access the editing functionality. 
If the current user is not an admin, it renders a message denying access.

User Retrieval: Utilizes Prisma, an ORM for Node.js and TypeScript, to query the database for a user with a specific ID derived from params. This ID is parsed into an integer and used in the query condition.

Condition Handling:

If no user is found matching the given ID, it renders a message indicating the user was not found.
For admin users, if the queried user exists, it proceeds to the editing phase but ensures the user's password is not exposed by clearing the password field before passing the user data to the UserForm component.

UserForm Component: Renders the UserForm component, passing the retrieved and sanitized user data as props. This form is likely set up to handle both the creation and editing of user details, adapting based on the presence of user data.

Prisma and Next-Auth Integration: Demonstrates the integration with Prisma for database operations and next-auth for session management and authentication, showcasing a typical pattern for handling secure data operations in Next.js applications.

Styling: Applies Tailwind CSS styling for error messages, emphasizing the use of utility-first CSS for component styling within React components.

This component encapsulates the logic for editing user details in a Next.js application, ensuring that only authorized users can perform these operations while providing a seamless user experience for data management.*/
