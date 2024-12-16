"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, User, LogOut, Settings } from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";
import { AuthModal } from "./AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user] = useAuthState(auth);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDark = () => {
    const newTheme = !isDarkMode;
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    setIsDarkMode(newTheme);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="px-4 py-2 flex items-center h-14 z-50 bg-background border-b border-border">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="w-5 h-5" />
        <span className="text-xl font-bold">calm/me</span>
      </Link>
      
      <div className="ml-auto flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDark}
          className="text-sm"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4" />
              {!isMobile && <span className="ml-2">light</span>}
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              {!isMobile && <span className="ml-2">dark</span>}
            </>
          )}
        </Button>

        {user ? (
          <div className="relative" ref={profileMenuRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative"
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <User className="h-4 w-4" />
              )}
            </Button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 py-2 bg-card border border-border rounded-lg shadow-lg"
                >
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    account settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-muted transition-colors text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowAuthModal(true)}
            className="text-sm"
          >
            log in
          </Button>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="login"
      />
    </header>
  );
}