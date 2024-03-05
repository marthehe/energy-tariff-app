import UserForm from "@/components/UserForm";
import React from "react";
import prisma from "@/prisma/db";

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
    </div>
  );
};

export default Users;
