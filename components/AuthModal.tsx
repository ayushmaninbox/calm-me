"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Button } from "./ui/button";
import { X, Mail } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, mode: initialMode }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError("Google sign in failed. Please try again.");
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-card p-8 rounded-2xl shadow-lg max-w-md w-full relative border border-border"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 hover:bg-muted/50"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2">
                {mode === "login" ? "welcome back" : "create account"}
              </h2>
              <p className="text-muted-foreground">
                {mode === "login"
                  ? "glad to see you again"
                  : "join calm/me today"}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base font-normal"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mr-3"
                />
                continue with google
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}
              <Button
                type="submit"
                className="w-full h-12 text-base bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Mail className="w-4 h-4 mr-2" />
                {mode === "login" ? "log in with email" : "sign up with email"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <>
                    don't have an account?{" "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-yellow-500 hover:text-yellow-600 font-medium"
                    >
                      sign up
                    </button>
                  </>
                ) : (
                  <>
                    already have an account?{" "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-yellow-500 hover:text-yellow-600 font-medium"
                    >
                      log in
                    </button>
                  </>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}