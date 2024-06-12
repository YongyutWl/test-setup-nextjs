'use client';
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const windowObject = typeof window !== "undefined";
  const localStorageObject = windowObject ? window.localStorage : null;
  const isLoggedIn = localStorageObject

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        {!isLoggedIn && (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
        <Button
          color="inherit"
          onClick={() => router.push("/home")}
          sx={{ mx: 2, my: 1, color: isLoggedIn ? "white" : "black" }}
          variant={isLoggedIn ? "contained" : "text"}
          style={{ backgroundColor: isLoggedIn ? "blue" : "transparent" }}
        >
          Home
        </Button>
        {isLoggedIn && (
          <Button color="inherit" onClick={() => router.push("/summary")}>
            Summary
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
