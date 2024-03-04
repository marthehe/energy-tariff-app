import dynamic from "next/dynamic";
import React from "react";

interface Props {
  params: { id: string };
}
const TariffForm = dynamic(() => import("@/components/TariffForm"), {
  ssr: false,
});

const EditTariff = async ({ params }: Props) => {
  const tariff = await prisma?.tariff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tariff) {
    return <p className=" text-destructive">Tariff not found!</p>;
  }

  return <TariffForm tariff={tariff} />;
};

export default EditTariff;
