import dynamic from "next/dynamic";
import React from "react";

const TariffForm = dynamic(() => import("@/components/TariffForm"), {
  ssr: false,
});

const NewTariff = () => {
  return <TariffForm />;
};

export default NewTariff;
