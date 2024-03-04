import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Tariffs = async () => {
  const tariffs = await prisma.tariff.findMany();

  return (
    <div>
      <Link
        href="/tariffs/new"
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <DataTable tariffs={tariffs} />
    </div>
  );
};

export default Tariffs;
