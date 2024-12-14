"use client";

import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Disclaimer() {
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

            <h1 className="text-4xl font-bold mb-8">ai disclaimer</h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>calm/me is powered by advanced artificial intelligence technology designed to provide emotional support and guidance. However, it is essential to understand the following:</p>

              <h2>Not a Substitute for Professional Help</h2>
              <ul>
                <li>The AI is not a licensed therapist or medical professional.</li>
                <li>For severe mental health concerns or emergencies, please contact a licensed therapist or emergency services immediately.</li>
              </ul>

              <h2>AI Limitations</h2>
              <ul>
                <li>While we strive for empathetic and accurate interactions, the AI may occasionally provide responses that are not entirely relevant or appropriate.</li>
                <li>User discretion is advised when interpreting AI responses.</li>
              </ul>

              <h2>Usage Responsibility</h2>
              <ul>
                <li>Users are responsible for their own well-being and the decisions they make based on their interactions with the platform.</li>
              </ul>

              <p>By engaging with calm/me, you acknowledge and agree to these terms.</p>

              <div className="bg-yellow-500/10 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-2">Emergency Resources</h3>
                <p>If you're experiencing a mental health emergency:</p>
                <ul>
                  <li>Emergency Services: 911 (US)</li>
                  <li>National Suicide Prevention Lifeline: 988</li>
                  <li>Crisis Text Line: Text HOME to 741741</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}