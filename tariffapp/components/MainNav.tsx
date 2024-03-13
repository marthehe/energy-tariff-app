// Importing Link from next/link for client-side navigation between pages
import Link from "next/link";
// Importing React, necessary for defining the component and using JSX
import React from "react";
// Importing the ToggleMode component for dark/light mode switching
import ToggleMode from "./ToggleMode";
// Importing MainNavLinks, likely a component that renders navigation links
import MainNavLinks from "./MainNavLinks";
// Importing getServerSession from next-auth for session handling on server-side
import { getServerSession } from "next-auth";
// Importing options for the next-auth configuration from a specific path
import options from "@/app/api/auth/[...nextauth]/options";

// Defining the MainNav component as an asynchronous function
const MainNav = async () => {
  // Fetching the current session information using next-auth's getServerSession with options
  const session = await getServerSession(options);

  return (
    <div className="flex justify-between">
      <MainNavLinks role={session?.user.role} />

      <div className="flex items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
        <ToggleMode />
      </div>
    </div>
  );
};
// Exporting MainNav as the default export of this module
export default MainNav;

//This code defines a navigation bar component (MainNav) for a web application using Next.js and next-auth for authentication.
//It dynamically renders login or logout options based on the user's session state and includes a toggle for switching modes, such as dark and light themes.
