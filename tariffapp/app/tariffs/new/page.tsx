import dynamic from "next/dynamic";
import React from "react";

const TariffForm = dynamic(() => import("@/components/TariffForm"), {
  ssr: false,
});

const NewTicket = () => {
  return <TariffForm />;
};

export default NewTicket;
