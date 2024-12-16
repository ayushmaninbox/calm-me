"use client";

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Brain, HeartPulse, Phone } from "lucide-react";

export default function Disclaimer() {
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
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h1 className="text-4xl font-bold mb-4">ai disclaimer</h1>
                <p className="text-muted-foreground">
                  Last updated: March 15, 2024
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-8">
                {/* AI Nature Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Brain className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        nature of AI service
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Computer-generated responses</li>
                        <li>• Not human therapy or medical advice</li>
                        <li>• May have limitations in understanding</li>
                        <li>• Responses based on training data</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Medical Disclaimer Section */}
                <section className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <HeartPulse className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        medical disclaimer
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Not a substitute for professional care</li>
                        <li>• Cannot diagnose medical conditions</li>
                        <li>• No prescription or treatment plans</li>
                        <li>• Seek professional help when needed</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Emergency Information */}
                <section className="bg-destructive/10 text-destructive rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        emergency contacts
                      </h2>
                      <ul className="space-y-3">
                        <li>• Emergency Services: 112</li>
                        <li>
                          • National Mental Health Helpline: 1800-599-0019
                        </li>
                        <li>• AASRA Suicide Prevention: 91-9820466726</li>
                        <li>• Vandrevala Foundation: 1860-2662-345</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section className="bg-yellow-500/5 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-semibold mb-4">
                    questions about our AI?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We're happy to explain how our AI works and its limitations.
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
