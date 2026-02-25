import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xs">
                  TR
                </span>
              </div>
              <span className="font-semibold">
                Ark Trackers PVT
              </span>
            </div>
            <p className="text-sm opacity-75">
              Real-time vehicle tracking for peace of mind.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#privacy"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="opacity-75 hover:opacity-100 transition-opacity"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-75">
            © 2025 Ark Trackers PVT. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/share/1K9pLbrCa7/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#twitter"
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/arktrackers?igsh=c2ZwZ3c4dmZlcnY4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#linkedin"
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
