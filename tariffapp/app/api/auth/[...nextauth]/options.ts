/*This code sets up authentication options for a Next.js application using NextAuth, specifically employing a credentials-based authentication method with custom login logic. Here's a breakdown of its core components and functionalities:

NextAuth and Provider Imports: Imports NextAuthOptions type from next-auth to ensure the options object conforms to the expected structure, and CredentialsProvider from next-auth/providers/credentials for username and password authentication.

Prisma ORM and bcryptjs: Utilizes Prisma for database access to find user records and bcryptjs for password hashing and comparison, highlighting the integration of database operations and secure password management within the authentication flow.

Authentication Options Configuration: Defines an options object with the type NextAuthOptions, configuring the NextAuth setup. This configuration includes:

Credentials Provider: Specifies a single provider using CredentialsProvider, configuring it for username and password authentication. This includes setting up form fields for the username and password and defining an authorize function. 
The authorize function asynchronously validates provided credentials against stored records in the database using Prisma and bcryptjs, returning the user object upon successful authentication or null to indicate failure.
Callbacks: Implements two callbacks, jwt and session, to customize the JWT token and session objects, respectively. The jwt callback adds a role property to the token, derived from the authenticated user's role. 
The session callback then transfers this role to the session object, ensuring that the user's role is accessible in the session for role-based access control in the application.
Export: Exports the configured options object for use in the NextAuth setup elsewhere in the application.

This setup provides a robust and customizable authentication solution tailored to applications requiring username and password login with role-based access control. 
It demonstrates the integration of NextAuth with a database and custom logic for credential verification, session management, and security practices.*/

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (match) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || "USER";
      }
      return session;
    },
  },
};

export default options;
