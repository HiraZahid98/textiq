'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-xl text-foreground">TextIQ</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-400 hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-400 hover:text-foreground transition">
              How It Works
            </Link>
            <Link href="#" className="text-slate-400 hover:text-foreground transition">
              Pricing
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block px-6 py-2 text-slate-300 hover:text-foreground transition"
            >
              Sign In
            </Link>
            <Link href="/login" className="glow-button">
              Start Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-3">
            <Link href="#features" className="block text-slate-400 hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how-it-works" className="block text-slate-400 hover:text-foreground transition">
              How It Works
            </Link>
            <Link href="#" className="block text-slate-400 hover:text-foreground transition">
              Pricing
            </Link>
            <Link
              href="/login"
              className="block text-slate-300 hover:text-foreground transition"
            >
              Sign In
            </Link>
            <Link href="/login" className="block text-slate-300 hover:text-foreground transition">
              Start Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}