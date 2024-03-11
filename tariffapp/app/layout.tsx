import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tariffs Application",
  description: "Generated by Marta Hendel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="flex flex-col items-center border-b mb-5 px-5 py-3">
            <div className="max-w-6xl w-full">
              <MainNav />
            </div>
          </nav>
          <main className="flex flex-col items-center border-b">
            <div className="max-w-6xl w-full">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

/*This code snippet defines a RootLayout component in a Next.js application, designed to serve as the root layout wrapper for the application's pages. 
Here's a breakdown of its features and functionalities:

Google Font Import: Utilizes the next/font/google module to import the Inter font, specifying the "latin" subset for efficiency. This approach optimizes font loading in a Next.js application.

Global Styles: Imports globals.css to apply global styles across the application, ensuring consistent styling.

Theme Management: Implements a ThemeProvider component from a custom module located at @/components/theme-provider. 
This provider is configured to support a default theme ("dark"), system theme preferences, and to gracefully handle theme transitions without abrupt changes.

Navigation Component: Includes a MainNav component as part of the layout, placed within a navigation bar (nav). This component is responsible for rendering the main navigation links across the application.

Layout Structure: Defines the HTML structure with a lang attribute for accessibility and SEO purposes. The body tag uses a class name derived from the imported Inter font for consistent typography.

Content Display: The children passed to RootLayout are rendered within a main section, allowing this layout component to wrap around various pages or components of the application. 
This section is designed for content flexibility, adapting to whatever children it receives.

Metadata Export: Exports a metadata object containing application-specific metadata like the title "Tariffs Application" and a description "Generated by Marta Hendel". 
This metadata can be used for SEO purposes or to provide information about the application.

Overall, the RootLayout component is crafted to provide a consistent structure, styling, and functionality across the application. 
It facilitates theme management, global styles application, and includes a main navigation component, making it a foundational piece for building a cohesive user interface.*/
