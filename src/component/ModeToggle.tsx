// ModeToggle.js
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Ensure this component is only rendered on the client side
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginLeft: '50px' }}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {theme === "dark" ? <Moon /> : <Sun />}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setTheme("light");
            handleClose();
          }}
        >
          Light
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme("dark");
            handleClose();
          }}
        >
          Dark
        </MenuItem>
      </Menu>
    </div>
  );
}
