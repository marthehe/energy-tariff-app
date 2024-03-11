/*This code is an extension of the types provided by the next-auth and next-auth/jwt modules for a Next.js application, integrating authentication with additional user-related fields. 
It customizes the default typing to include more specific user information, enhancing the standard session and JWT token with custom properties that are likely tied to the application's data model, particularly around user management and roles.

Session Extension: It extends the Session interface to include a user object with username and role properties alongside the default user properties provided by NextAuth. 
This allows the session to carry additional user information, making it accessible throughout the application wherever the session is used.

User Interface: A new User interface is declared, describing a user object with id, name, username, and role fields. 
The role field uses the Role type imported from @prisma/client, suggesting the application uses Prisma as its ORM and that there is a defined Role enum or model within the database schema.

JWT Interface Extension: The JWT interface from next-auth/jwt is extended to optionally include a role property. 
This is useful for encoding the user's role within the JWT token, which can then be used for authorization decisions or role-based access control within the application.

Overall, this code customizes the authentication flow in a Next.js application to support a more detailed user model, including roles, directly within the session and JWT tokens used for authentication and authorization purposes.*/

import NextAuth, { DefaultSession } from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    name: string;
    username: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
