/*
This code snippet defines a React component named ToggleMode that allows users to switch between light and dark themes in a Next.js application using the next-themes package. 
The component uses useState to track whether it has been mounted to ensure that theme-related operations only occur in the browser environment where themes are applicable. 
This is necessary because Next.js does server-side rendering, and themes are typically a browser-side preference.

Upon mounting, the component sets mounted to true using useEffect to trigger re-rendering. If the component has not been mounted yet, it renders a disabled Button to serve as a placeholder.

The actual theme toggling is handled by checking the current theme value, provided by the useTheme hook from next-themes. 
Depending on whether the current theme is set to "dark", the component renders a Button with an icon (either a Sun for switching to light mode or a Moon for dark mode). 
Clicking the button toggles the theme between "dark" and "light" modes by updating the theme state with setTheme.

The Button component comes from a local ui/button module and likely supports different variant and size props for customization. The icons (Moon and Sun) come from the lucide-react package, which provides React components for Lucide icons. 
These icons change based on the current theme to visually indicate which theme will be set if the button is clicked. 
Additional classes are applied to the icons for hover effects, enhancing the user experience by providing visual feedback.*/

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled={true}></Button>;
  }

  const dark = theme === "dark";
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
    >
      {dark ? (
        <Sun className="hover:cursor-pointer hover:text-primary" />
      ) : (
        <Moon className="hover:cursor-pointer hover:text-primary" />
      )}
    </Button>
  );
};

export default ToggleMode;
