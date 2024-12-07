"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "what is calm/me?",
    answer: "calm/me is your free 24/7 AI therapist, designed to provide empathetic and supportive conversations whenever you need them. it's a safe space to talk about your feelings, thoughts, and concerns without judgment."
  },
  {
    question: "how does calm/me work?",
    answer: "calm/me uses advanced AI to engage in real-time, voice-based conversations. it listens, understands your emotions, and provides personalized support based on your needs. you can speak naturally, just like talking to a friend."
  },
  {
    question: "is calm/me really free?",
    answer: "yes! calm/me is completely free to use. we believe mental health support should be accessible to everyone."
  },
  {
    question: "is my data secure and confidential?",
    answer: "absolutely. we take your privacy seriously. all conversations are encrypted, and your data is stored securely. you can delete your data anytime, and we never share your information with third parties."
  },
  {
    question: "is calm/me a replacement for traditional therapy?",
    answer: "while calm/me provides valuable support, it's not a replacement for professional mental health care. if you're experiencing severe mental health issues, please consult with a licensed therapist or mental health professional."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-border">
        <button
          className="w-full py-4 px-6 flex items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium">{question}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-4 text-muted-foreground">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  export default function FAQ() {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">frequently asked questions</h2>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>
    );
  }