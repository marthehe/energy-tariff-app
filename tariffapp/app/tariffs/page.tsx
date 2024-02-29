import React from "react";
import prisma from "@/prisma/db";

const Tariffs = async () => {
  const tariffs = await prisma.tariff.findMany();

  console.log(tariffs);
  return <div>Tariffs</div>;
};

export default Tariffs;
