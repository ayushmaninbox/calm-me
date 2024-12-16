"use client";

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12">
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

            <div className="space-y-12">
              {/* Header Section */}
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h1 className="text-4xl font-bold mb-4">privacy policy</h1>
                <p className="text-muted-foreground">
                  Last updated: December 15, 2024
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-8">
                {/* Data Collection Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Lock className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        data collection
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>
                          • Personal information (name, email) for account
                          creation
                        </li>
                        <li>
                          • Voice data processed in real-time (not stored)
                        </li>
                        <li>• Usage analytics to improve service quality</li>
                        <li>• Chat logs for conversation continuity</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Data Usage Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Eye className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        how we use your data
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Personalizing your therapy experience</li>
                        <li>• Improving our AI model and services</li>
                        <li>• Ensuring platform security</li>
                        <li>• Communication about your account</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* User Rights Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <UserCheck className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        your rights
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Access your personal data</li>
                        <li>• Request data modification or deletion</li>
                        <li>• Opt-out of data collection</li>
                        <li>• Export your data</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section className="bg-yellow-500/5 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-semibold mb-4">
                    questions about privacy?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We're here to help with any privacy-related concerns.
                  </p>
                  <Link
                    href="mailto:ai.calmme@gmail.com"
                    className="text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    ai.calmme@gmail.com
                  </Link>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
