"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { upsertProfile } from "@/lib/supabase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";

interface ImageUploadProps {
  currentPhotoURL: string | null;
  onImageSelect: (file: File) => Promise<void>;
  isUploading: boolean;
}

export function ImageUpload({ currentPhotoURL, isUploading }: ImageUploadProps) {
  const [user] = useAuthState(auth);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File | null) => {
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // First create/update the profile
      await upsertProfile({
        id: user.uid,
        email: user.email!,
        display_name: user.displayName || null,
      });

      // Upload new image
      const { url, publicId } = await uploadImage(file);

      // Update profile with new image info
      await upsertProfile({
        id: user.uid,
        photo_url: url,
        cloudinary_public_id: publicId,
      });

      // Update Firebase profile
      await updateProfile(user, { photoURL: url });

    } catch (error: any) {
      console.error("Error processing image:", error);
      setError(error.message || "Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    await handleFileChange(file || null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <div
        className={`
          relative w-24 h-24 rounded-full overflow-hidden
          ${dragActive ? 'ring-2 ring-yellow-500' : 'ring-1 ring-border'}
          transition-all duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : previewURL || currentPhotoURL ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              <Image
                src={previewURL || currentPhotoURL || ''}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized
              />
              <button
                onClick={clearPreview}
                className="absolute top-0 right-0 p-1 bg-black/50 rounded-bl-lg hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-muted flex items-center justify-center"
            >
              <User className="w-8 h-8 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      <Button
        size="icon"
        onClick={handleButtonClick}
        disabled={isProcessing}
        className="absolute -bottom-2 -right-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black"
      >
        <Upload className="w-4 h-4" />
      </Button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 text-sm text-destructive text-center"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}