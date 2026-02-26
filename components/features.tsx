'use client'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative p-8 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm card-hover overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300"></div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all" suppressHydrationWarning>
          <div className="text-2xl">{icon}</div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>

        {/* Description */}
        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{description}</p>
      </div>
    </div>
  )
}

export function Features() {
  const features = [
    {
      icon: '✨',
      title: 'AI Summary',
      description: 'Get concise summaries of any text, condensing lengthy documents into key points instantly.',
    },
    {
      icon: '😊',
      title: 'Sentiment Analysis',
      description: 'Understand the emotional tone and sentiment of your text with advanced NLP algorithms.',
    },
    {
      icon: '🎯',
      title: 'Key Topics',
      description: 'Automatically extract and identify the most important topics discussed in your content.',
    },
    {
      icon: '📊',
      title: 'Readability Score',
      description: 'Measure text complexity and get actionable recommendations to improve readability.',
    },
  ]

  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-sm font-medium">
              Features
            </div>
          </div>
          <h2 className="section-title mb-6">
            Powerful Features for <span className="gradient-text">Text Analysis</span>
          </h2>
          <p className="hero-subtitle max-w-2xl mx-auto">
            Our AI-powered tools give you everything you need to understand and optimize your text content.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
