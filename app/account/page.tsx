//@ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, Trash2, ArrowLeft } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";

export default function AccountPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    } else if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setIsGoogleUser(user.providerData.some(provider => provider.providerId === 'google.com'));
      setHasPassword(user.providerData.some(provider => provider.providerId === 'password'));
    }
  }, [user, loading, router]);

  const handleImageSelect = async (file: File) => {
    if (!user) return;
    setIsUploadingImage(true);
    setError("");
    
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          try {
            const downloadURL = await uploadProfileImage(imageData, user.uid);
            await updateProfile(user, { photoURL: downloadURL });
            setPhotoURL(downloadURL);
            setSuccess("Profile photo updated successfully!");
          } catch (error: any) {
            setError("Failed to upload image. Please try again.");
          }
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Failed to process image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      setSuccess("Profile updated successfully!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      setError(error.message || "Failed to update profile");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user || !user.email) return;
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      if (hasPassword) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      }
      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setHasPassword(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      setError(error.message || "Failed to update password");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || !user.email) return;
    setIsLoading(true);
    setError("");

    try {
      if (hasPassword) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      }
      await deleteUser(user);
      router.push("/");
    } catch (error: any) {
      setError(error.message || "Failed to delete account");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl font-medium text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-yellow-500/5 to-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">account settings</h1>

        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              error 
                ? "bg-destructive/10 text-destructive" 
                : "bg-green-500/10 text-green-500"
            }`}
          >
            {error || success}
          </motion.div>
        )}
        
        <motion.div 
          className="bg-card p-6 rounded-lg border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4">profile information</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <ImageUpload
                currentPhotoURL={photoURL}
                onImageSelect={handleImageSelect}
                isUploading={isUploadingImage}
              />
              <div>
                <h3 className="font-medium">photo</h3>
                <p className="text-sm text-muted-foreground">
                  click the upload icon to change your profile picture
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">email</label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-border bg-muted text-muted-foreground"
                />
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleUpdateProfile}
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {isLoading ? "updating..." : "update profile"}
          </Button>
        </motion.div>

        <motion.div 
          className="bg-card p-6 rounded-lg border border-border mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-4">
            {isGoogleUser && !hasPassword ? "set password" : "change password"}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {isGoogleUser && !hasPassword 
              ? "Set a password to enable account deletion and additional security options."
              : "Change your account password here."}
          </p>
          
          <div className="space-y-4">
            {hasPassword && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  current password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-1">
                {hasPassword ? "new password" : "password"}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                confirm {hasPassword ? "new " : ""}password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
              />
            </div>
          </div>
          
          <Button
            onClick={handleUpdatePassword}
            disabled={isLoading}
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {isLoading ? "updating..." : hasPassword ? "update password" : "set password"}
          </Button>
        </motion.div>

        {(hasPassword || isGoogleUser) && (
          <motion.div 
            className="bg-card p-6 rounded-lg border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">delete account</h2>
            <p className="text-sm text-muted-foreground mb-4">
              once you delete your account, there is no going back. please be certain.
              {!hasPassword && isGoogleUser && " you need to set a password first to delete your account."}
            </p>
            
            {!showDeleteConfirm ? (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full"
                disabled={!hasPassword}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                delete account
              </Button>
            ) : (
              <div className="space-y-4">
                {hasPassword && (
                  <input
                    type="password"
                    placeholder="Enter your password to confirm"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all"
                  />
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setCurrentPassword("");
                    }}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    go back
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isLoading || !hasPassword}
                    className="w-full"
                  >
                    {isLoading ? "deleting..." : "confirm delete"}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}