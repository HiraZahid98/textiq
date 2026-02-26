'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient background blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8 inline-block">
          <div className="px-4 py-2 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-300 text-sm font-medium">
            🚀 Powered by Advanced AI
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="section-title mb-6 text-foreground">
          Analyze Any Text in Seconds with{' '}
          <span className="gradient-text">AI</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mb-12 max-w-2xl mx-auto">
          Extract insights, understand sentiment, identify key topics, and measure readability instantly. 
          Powered by cutting-edge artificial intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          <Link href="#" className="glow-button">
            Start Analyzing Free
          </Link>
          <button className="glow-secondary">
            Watch Demo
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-border/50">
          <div>
            <div className="text-3xl font-bold gradient-text mb-2">500K+</div>
            <div className="text-slate-400">Texts Analyzed Daily</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text mb-2">&lt;200ms</div>
            <div className="text-slate-400">Average Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-slate-400">Uptime Guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
