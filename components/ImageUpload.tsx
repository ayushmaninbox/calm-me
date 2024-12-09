"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ImageUploadProps {
  currentPhotoURL: string | null;
  onImageSelect: (file: File) => Promise<void>;
  isUploading: boolean;
}

export function ImageUpload({ currentPhotoURL, onImageSelect, isUploading }: ImageUploadProps) {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewURL(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    await onImageSelect(file);
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
          {isUploading ? (
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
        disabled={isUploading}
        className="absolute -bottom-2 -right-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black"
      >
        <Upload className="w-4 h-4" />
      </Button>
    </div>
  );
}