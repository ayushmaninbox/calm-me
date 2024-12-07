import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic, Shield, Brain } from 'lucide-react';
import FAQ from '@/components/FAQ';
import { FeatureCard } from '@/components/FeatureCard';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl">
          talk through your problems with <span className="text-yellow-500">ease.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
          no high fees, no wait times, no downloads, no hassle— just therapy with an empathetic AI whenever and wherever you need it.
        </p>
        <Link href="/chat">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
            connect now
          </Button>
        </Link>
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
        <Link href="/chat">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8">
            try calm/me free
          </Button>
        </Link>
      </section>
    </main>
  );
}