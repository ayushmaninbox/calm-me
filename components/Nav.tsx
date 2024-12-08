"use client";

import { useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;
    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="px-4 py-3 flex items-center h-14 z-50 bg-background border-b border-border">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <div className="text-xl font-bold lowercase-all">calm/me</div>
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="lowercase-all"
          onClick={toggleDark}
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4 mr-2" />
          ) : (
            <Moon className="h-4 w-4 mr-2" />
          )}
          {isDarkMode ? "light" : "dark"}
        </Button>
        <Button size="sm" variant="outline" className="lowercase-all">
          log in
        </Button>
        <Button size="sm" className="lowercase-all bg-primary text-primary-foreground">
          sign up
        </Button>
      </div>
    </div>
  );
}