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

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user] = useAuthState(auth);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
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
      setShowProfileMenu(false);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push('/chat');
    } else {
      router.push('/');
    }
  };

  return (
    <header className="px-4 py-2 flex items-center h-14 z-50 bg-background border-b border-border transition-colors duration-300">
      <a href={user ? '/chat' : '/'} onClick={handleLogoClick} className="flex items-center gap-2">
        <Logo className="w-5 h-5" />
        <div className="text-xl font-bold lowercase-all">calm/me</div>
      </a>
      <div className="ml-auto flex items-center gap-3">
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
          <div className="relative" ref={profileMenuRef}>
            <Button
              variant="ghost"
              size="icon"
              className="profile-button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <div className="profile-button-placeholder">
                  <User className="h-4 w-4" />
                </div>
              )}
            </Button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium truncate">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setShowProfileMenu(false)}
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Button
            size="sm"
            className="lowercase-all bg-primary text-primary-foreground"
            onClick={() => setShowAuthModal(true)}
          >
            start now
          </Button>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="signup"
      />
    </header>
  );
};