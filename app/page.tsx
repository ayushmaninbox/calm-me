"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic, Shield, Brain } from 'lucide-react';
import FAQ from '@/components/FAQ';
import { FeatureCard } from '@/components/FeatureCard';
import { Footer } from '@/components/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { AuthModal } from '@/components/AuthModal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Chat from '@/components/Chat';

export default function Home() {
  const [user] = useAuthState(auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeChat = async () => {
      if (!user || !user.emailVerified) return;
      
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        setAccessToken(data.accessToken);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      initializeChat();
    }
  }, [user]);

  // If user is logged in and verified, show the chat
  if (user?.emailVerified && accessToken) {
    return (
      <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
        <Chat accessToken={accessToken} />
      </div>
    );
  }

  const handleAction = (action: "connect" | "try") => {
    setAuthMode(action === "connect" ? "login" : "signup");
    setShowAuthModal(true);
  };

  // Only show the home page for logged-out users
  if (user) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
          talk through your problems with <span className="text-yellow-500">ease.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
          no fees, no wait times, no downloads, no hassle— just therapy with an empathetic AI whenever and wherever you need it.
        </p>
        <Button 
          size="lg" 
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8"
          onClick={() => handleAction("connect")}
        >
          connect now
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">all the good stuff</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Mic className="h-6 w-6" />}
              title="therapy on demand"
              description="got stuff on your mind? just start yapping with calm/me, your real-time ai therapist that's ready 24/7."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="safe & sound"
              description="spill all the tea – calm/me's got you. your sessions are secure and confidential."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6" />}
              title="personalized growth"
              description="calm/me remembers your journey and adapts to your needs, helping you grow at your own pace."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">get started for free</h2>
        <p className="text-muted-foreground mb-8">be heard. be understood. be better.</p>
        <Button 
          size="lg" 
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8"
          onClick={() => handleAction("try")}
        >
          try calm/me for free
        </Button>
      </section>

      {/* Footer */}
      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </main>
  );
}
