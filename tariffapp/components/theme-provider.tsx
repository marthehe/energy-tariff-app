"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

/*This code creates a custom ThemeProvider component in a React application that utilizes the next-themes package to provide theme switching capabilities, particularly for Next.js projects. The next-themes package is designed to manage theme switching in Next.js applications efficiently, supporting features like system preferences and persisting theme choices without flashing effects on initial page loads.

Key points of the code include:

React Import: It imports React to use JSX syntax for rendering.

next-themes Integration: Utilizes NextThemesProvider from the next-themes package as the core mechanism for theme management. This provider component is wrapped around the application's component tree to enable theme switching functionality.

TypeScript Support: Imports ThemeProviderProps type from next-themes, ensuring that the custom ThemeProvider component props adhere to the expected types for compatibility with NextThemesProvider.

Functional Component Definition: Defines a functional component named ThemeProvider that takes in children and any other props (...props) specified in ThemeProviderProps.

Props Spreading and Children Rendering: The component forwards all received props to NextThemesProvider and renders children within it. 
This approach allows the custom ThemeProvider to act as a thin wrapper around NextThemesProvider, enabling easy customization and extension if needed.

This custom ThemeProvider simplifies integrating theme switching in a Next.js application by abstracting the NextThemesProvider setup, making it easier to apply across the application with added flexibility for further customizations.*/
