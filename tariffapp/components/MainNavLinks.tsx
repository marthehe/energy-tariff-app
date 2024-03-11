"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavLinks = ({ role }: { role?: string }) => {
  const links = [
    { label: "Dashboard", href: "/", adminOnly: false },
    { label: "Tariffs", href: "/tariffs", adminOnly: false },
    { label: "Users", href: "/users", adminOnly: true },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => !link.adminOnly || role === "ADMIN")
        .map((link) => (
          <Link
            href={link.href}
            className={`navbar-link ${
              currentPath == link.href &&
              "cursor-default text-primary/70 hover:text-primary/60"
            }`}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
};

export default MainNavLinks;

/*This code defines a React component named MainNavLinks that generates navigation links for a web application using Next.js. The component displays different links based on the user's role, specifically filtering out certain links for non-admin users. Here's an overview of its functionality:

Role-based Link Filtering: Accepts a role prop to determine the user's role. Based on this role, it filters the navigation links to display. For instance, the "Users" link is only accessible to users with an "ADMIN" role.

Navigation Links Definition: Defines an array of link objects, each containing the label for the link text, href for the destination path, and adminOnly boolean to indicate if the link should be restricted to admin users.

Current Path Detection: Uses the usePathname hook from next/navigation to determine the current path of the application. This is used to apply specific styles to the currently active navigation link.

Conditional Styling: Applies conditional styling to highlight the current active link by comparing each link's href with the current path. If a link matches the current path, it receives additional styling to indicate it's the active link.

Accessibility and Key Prop: For each link rendered, it ensures accessibility and React's list rendering best practices by providing a unique key prop, using the link's label.

Styling and Layout: Utilizes Tailwind CSS for styling, creating a horizontal list of links (flex layout) with some spacing (gap-2) between them. The class names for styling are conditionally applied based on whether the link is the active page.

Overall, MainNavLinks serves as a dynamic navigation component that adjusts the links available to the user based on their role, enhancing the user experience by providing relevant navigation options and visual feedback on the active page.*/
