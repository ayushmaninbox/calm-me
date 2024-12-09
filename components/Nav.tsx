"use client";

import { useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";
import { AuthModal } from "./AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [user] = useAuthState(auth);

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

  const handleAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
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
          
          {user ? (
            <>
              <Button
                size="sm"
                variant="outline"
                className="lowercase-all"
                onClick={handleLogout}
              >
                log out
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                className="lowercase-all"
                onClick={() => handleAuth("login")}
              >
                log in
              </Button>
              <Button
                size="sm"
                className="lowercase-all bg-primary text-primary-foreground"
                onClick={() => handleAuth("signup")}
              >
                sign up
              </Button>
            </>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </>
  );
};