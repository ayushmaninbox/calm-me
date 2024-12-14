"use client";

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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

            <h1 className="text-4xl font-bold mb-8">privacy policy</h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>At calm/me, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide while using our platform.</p>

              <h2>Information We Collect</h2>
              <ul>
                <li>We may collect personal details like your name, email address, or other information you voluntarily provide.</li>
                <li>We collect usage data, such as interactions with the platform, to improve the service.</li>
                <li>Voice data is temporarily processed to enable real-time conversations but is not stored.</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <ul>
                <li>To personalize your experience and provide tailored support.</li>
                <li>To improve the platform's performance and features.</li>
                <li>To ensure compliance with applicable laws and regulations.</li>
              </ul>

              <h2>Data Security</h2>
              <ul>
                <li>Your data is encrypted and stored securely to prevent unauthorized access.</li>
                <li>We use industry-standard security measures to safeguard your information.</li>
              </ul>

              <h2>Your Rights</h2>
              <ul>
                <li>You can request access to, modification, or deletion of your personal data at any time.</li>
                <li>You may opt out of any non-essential data collection by contacting us.</li>
              </ul>

              <p>By using calm/me, you consent to this Privacy Policy. If you have questions, please contact ayushmanmohapatra895@gmail.com.</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}