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

/*This code defines an asynchronous React component named EditTariff, intended for use in a Next.js application for editing tariff details. 
The component dynamically imports a TariffForm component without server-side rendering (SSR) using Next.js's dynamic function. Here's an overview of its functionality:

Dynamic Import: Utilizes dynamic from Next.js to import the TariffForm component. The { ssr: false } option is specified to disable server-side rendering for this component, 
likely because it includes client-side only features such as access to the browser's window object or is heavy on JavaScript, which could unnecessarily increase the server response time.

Props Definition: Accepts params as props, which contains a id field. This ID is used to identify the specific tariff that needs to be edited.

Tariff Retrieval: Uses Prisma (an ORM for Node.js and TypeScript) to fetch the tariff details from the database based on the provided id. The id is parsed into an integer before being used in the query. 
This operation assumes the existence of a prisma instance and a database model named tariff.

Conditional Rendering:

If the tariff is not found (i.e., the query returns null), the component renders a paragraph with a message indicating that the tariff was not found, styled with a class to make the text appear destructive or alerting.
If the tariff is found, it renders the TariffForm component, passing the retrieved tariff data as props to the form, allowing for the editing of the existing tariff details.
This component is designed for scenarios where an existing tariff needs modifications. By dynamically importing the form component and disabling SSR, it optimizes client-side performance and ensures that the tariff data can be handled interactively. 
This approach, coupled with conditional rendering based on the tariff retrieval outcome, provides a user-friendly experience for editing tariff details within a web application.*/
