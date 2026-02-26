'use client'

interface StepProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
}

function Step({ number, title, description, icon }: StepProps) {
  return (
    <div className="relative">
      {/* Connector line - hidden on mobile */}
      {number < 3 && (
        <div className="hidden lg:block absolute top-20 left-[calc(50%+60px)] w-[calc(100%-120px)] h-1 bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50"></div>
      )}

      <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 card-hover hover:border-cyan-500/50">
        {/* Number circle */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-lg mb-4">
          {number}
        </div>

        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>

        {/* Description */}
        <p className="text-slate-400">{description}</p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const steps = [
    {
      icon: '📝',
      title: 'Paste Your Text',
      description: 'Simply paste any text, document, or content into TextIQ and let our AI analyze it instantly.',
    },
    {
      icon: '⚡',
      title: 'AI Processing',
      description: 'Our advanced algorithms process your text in real-time, extracting insights and analyzing patterns.',
    },
    {
      icon: '💡',
      title: 'Get Insights',
      description: 'Receive comprehensive analysis with summaries, sentiment scores, key topics, and readability metrics.',
    },
  ]

  return (
    <section id="how-it-works" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-300 text-sm font-medium">
              Process
            </div>
          </div>
          <h2 className="section-title mb-6">
            How <span className="gradient-text">TextIQ</span> Works
          </h2>
          <p className="hero-subtitle max-w-2xl mx-auto">
            Simple, fast, and intelligent. Three easy steps to unlock powerful text insights.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step key={index} number={index + 1} {...step} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">Ready to transform your text analysis workflow?</p>
          <button className="glow-button">
            Start Analyzing Today
          </button>
        </div>
      </div>
    </section>
  )
}
