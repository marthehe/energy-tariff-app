import React from "react";
import prisma from "@/prisma/db";
import TariffDetail from "./TariffDetail";

interface Props {
  params: { id: string };
}

const ViewTariff = async ({ params }: Props) => {
  const tariff = await prisma.tariff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tariff) {
    return <p className=" text-destructive">Tariff Not Found!</p>;
  }

  return <TariffDetail tariff={tariff} />;
};

export default ViewTariff;
