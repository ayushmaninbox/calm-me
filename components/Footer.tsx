"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold">calm/me</span>
            </Link>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-bold mb-4">socials</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.instagram.com/theayushmanguy/"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                  <span>instagram</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/ayushman-mohapatra/"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>linked-in</span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:ayushmanmohapatra895@gmail.com"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="h-4 w-4" />
                  <span>email</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground"
                >
                  terms of service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  ai disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Creator */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">© 2024 calm/me inc.</p>
            <p className="text-sm text-muted-foreground">
              by{" "}
              <Link
                href="https://ayushmanmohapatra.netlify.app/"
                className="underline hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                ayushman mohapatra
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
