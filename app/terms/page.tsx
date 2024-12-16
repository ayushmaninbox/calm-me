"use client";

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Users,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

export default function Terms() {
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
                <FileText className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h1 className="text-4xl font-bold mb-4">terms of service</h1>
                <p className="text-muted-foreground">
                  Last updated: March 15, 2024
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-8">
                {/* User Agreement Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        user agreement
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Must be 18+ to use the service</li>
                        <li>• Provide accurate account information</li>
                        <li>• Maintain account security</li>
                        <li>• Use the service responsibly</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Service Rules Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        prohibited activities
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• No harmful or malicious behavior</li>
                        <li>• No unauthorized access attempts</li>
                        <li>• No sharing of account credentials</li>
                        <li>• No misuse of the AI system</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Support Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        service support
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• 24/7 access to AI therapy</li>
                        <li>• Technical support via email</li>
                        <li>• Regular platform updates</li>
                        <li>• Community guidelines</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section className="bg-yellow-500/5 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-semibold mb-4">need help?</h2>
                  <p className="text-muted-foreground mb-4">
                    Contact us for any questions about our terms of service.
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
