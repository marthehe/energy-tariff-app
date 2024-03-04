import { Tariff } from "@prisma/client";
import React from "react";

interface Props {
  tariff: Tariff;
}

const TariffDetail = ({ tariff }: Props) => {
  return (
    <div>
      <p>{tariff.name}</p>
      <p>{tariff.description}</p>
    </div>
  );
};
export default TariffDetail;
