import type { Metadata } from "next";
import RootLayoutClient from "./layout.client";
import "./globals.css";

export const metadata: Metadata = {
  title: "calm/me - your personal therapist",
  description: "your personal ai therapist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  );
}