"use client";

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to home
            </Link>

            <h1 className="text-4xl font-bold mb-8">terms & conditions</h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>Welcome to calm/me. By accessing or using our platform, you agree to the following Terms & Conditions:</p>

              <h2>Acceptance of Terms</h2>
              <ul>
                <li>By using the platform, you agree to comply with these terms.</li>
                <li>If you do not accept these terms, please discontinue use immediately.</li>
              </ul>

              <h2>Use of Service</h2>
              <ul>
                <li>calm/me is designed for personal, non-commercial use only.</li>
                <li>You must be 18 years or older to use the platform.</li>
              </ul>

              <h2>User Responsibilities</h2>
              <ul>
                <li>You agree to provide accurate information when interacting with the platform.</li>
                <li>You must not misuse the platform, including attempting to harm, exploit, or reverse-engineer the AI technology.</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <ul>
                <li>calm/me is provided "as is" without warranties of any kind.</li>
                <li>We are not liable for any damages arising from your use of the platform.</li>
              </ul>

              <h2>Termination</h2>
              <ul>
                <li>We reserve the right to suspend or terminate access to the platform at our discretion.</li>
              </ul>

              <h2>Modifications</h2>
              <ul>
                <li>We may update these Terms & Conditions periodically, and continued use of the platform constitutes acceptance of these updates.</li>
              </ul>

              <p>For any questions or concerns, please contact ayushmanmohapatra895@gmail.com.</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}