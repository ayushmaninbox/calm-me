"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, sendVerificationEmail, resetPassword } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { Button } from "./ui/button";
import { X, Mail, User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, mode: initialMode }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const validateForm = () => {
    if (mode === "signup") {
      if (!name.trim()) return "Please enter your name";
      if (password !== confirmPassword) return "Passwords don't match";
      if (password.length < 8) return "Password must be at least 8 characters";
    }
    if (!email.trim()) return "Please enter your email";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    if (!password && !showForgotPassword) return "Please enter your password";
    return null;
  };

  const handleForgotPassword = async () => {
    setError("");
    setIsLoading(true);

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword(email);
      setResetEmailSent(true);
    } catch (error: any) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: name });
        const emailSent = await sendVerificationEmail();
        if (emailSent) {
          setVerificationSent(true);
        }
      }
    } catch (err: any) {
      let errorMessage = "Something went wrong. Please try again.";
      if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError("Google sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError("");
    setVerificationSent(false);
    setShowForgotPassword(false);
    setResetEmailSent(false);
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
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>

            {showForgotPassword ? (
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-4"
                  onClick={() => setShowForgotPassword(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <h2 className="text-2xl font-bold mb-2">reset password</h2>
                {resetEmailSent ? (
                  <>
                    <p className="text-muted-foreground mb-6">
                      check your email for password reset instructions
                    </p>
                    <Button
                      onClick={onClose}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      close
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-6">
                      enter your email and we'll send you instructions
                    </p>
                    <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }}>
                      <div className="relative mb-4">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                          disabled={isLoading}
                        />
                      </div>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mb-4"
                        >
                          {error}
                        </motion.p>
                      )}
                      <Button
                        type="submit"
                        className="w-full h-12 text-base bg-yellow-500 hover:bg-yellow-600 text-black"
                        disabled={isLoading}
                      >
                        {isLoading ? "sending..." : "send reset link"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            ) : verificationSent ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">verify your email</h3>
                <p className="text-muted-foreground mb-4">
                  we've sent a verification link to {email}. please check your inbox and verify your email to continue.
                </p>
                <Button
                  onClick={onClose}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  close
                </Button>
              </div>
            ) : (
              <>
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
                    disabled={isLoading}
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
                  {mode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-10 pr-12 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {mode === "signup" && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 pl-10 pr-12 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  )}

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
                    disabled={isLoading}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {isLoading
                      ? "please wait..."
                      : mode === "login"
                      ? "log in with email"
                      : "sign up with email"}
                  </Button>

                  {mode === "login" && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setShowForgotPassword(true)}
                      disabled={isLoading}
                    >
                      forgot password?
                    </Button>
                  )}

                  <div className="text-center text-sm text-muted-foreground">
                    {mode === "login" ? (
                      <>
                        don't have an account?{" "}
                        <button
                          type="button"
                          onClick={toggleMode}
                          className="text-yellow-500 hover:text-yellow-600 font-medium"
                          disabled={isLoading}
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
                          disabled={isLoading}
                        >
                          log in
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}