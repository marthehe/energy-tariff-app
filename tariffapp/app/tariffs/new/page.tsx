import dynamic from "next/dynamic";
import React from "react";

const TariffForm = dynamic(() => import("@/components/TariffForm"), {
  ssr: false,
});

const NewTariff = () => {
  return <TariffForm />;
};

export default NewTariff;

/*This code defines a React component named NewTariff within a Next.js application framework. The primary purpose of this component is to render a form for creating new tariffs. 
It leverages Next.js's dynamic function to import the TariffForm component dynamically with Server-Side Rendering (SSR) disabled. Here's a breakdown of its key functionalities:

Dynamic Import: Uses the dynamic function from Next.js to import the TariffForm component. This method allows for code-splitting and loading components on demand. 
The option { ssr: false } indicates that the TariffForm should not be rendered on the server-side, possibly because it contains client-side only functionalities or it relies on browser-specific APIs.

TariffForm Component: The TariffForm is assumed to be a component located at @/components/TariffForm. It is likely designed to provide a user interface for inputting data required to create or edit a tariff. 
Being dynamically imported, it helps in reducing the initial load time of the page by not including it in the main bundle.

NewTariff Component: This is a simple functional component that returns the dynamically imported TariffForm. 
The NewTariff component acts as a wrapper or entry point to the form, potentially to be used in a specific route within the application where users can create new tariffs.

Export: The NewTariff component is exported as the default export of the module, making it available for use in other parts of the application, such as being rendered within a specific route for creating new tariffs.

This setup is beneficial for optimizing performance and user experience in a web application, as it reduces the initial load time by not server-side rendering components that are not necessary during the initial load 
and are heavy or rely heavily on client-side functionality.*/
