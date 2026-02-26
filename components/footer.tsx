'use client'

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-foreground">TextIQ</span>
            </Link>
            <p className="text-sm text-slate-400">
              AI-powered text analytics for modern teams.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Features</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">API Docs</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Roadmap</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">About</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Blog</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Careers</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Terms</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Cookies</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Security</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">LinkedIn</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">GitHub</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Discord</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">
              © {currentYear} TextIQ. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Privacy Policy</Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-foreground transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
