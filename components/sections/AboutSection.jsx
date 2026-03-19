'use client'

import SectionShell from '@/components/ui/SectionShell'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function AboutSection() {
  return (
    <AnimatedSection>
      <SectionShell>
        <h2 className="section-title">About</h2>
        <p className="max-w-3xl muted">
          I started by redesigning small local websites and evolved into a React-focused product
          partner for startups and agencies. My approach blends interaction design, component
          architecture, and conversion-aware UX to help products look premium and perform better.
        </p>
      </SectionShell>
    </AnimatedSection>
  )
}
