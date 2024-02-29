import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";

const Tariffs = async () => {
  const tariffs = await prisma.tariff.findMany();

  console.log(tariffs);
  return (
    <div>
      <DataTable tariffs={tariffs} />
    </div>
  );
};

export default Tariffs;
