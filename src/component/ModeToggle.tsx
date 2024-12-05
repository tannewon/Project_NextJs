"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import IconButton from "@mui/material/IconButton";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure this component is only rendered on the client side
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div style={{ marginLeft: '50px' }}>
      <IconButton
        onClick={handleClick}
        style={{
          color: theme === "dark" ? "yellow" : "white", // Change color based on the theme
          backgroundColor: theme === "dark" ? "#333" : "orange", // Optional: Background color change
        }}
      >
        {theme === "dark" ? <Moon /> : <Sun />}
      </IconButton>
    </div>
  );
}
