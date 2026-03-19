'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import SectionShell from '@/components/ui/SectionShell'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [14, -14])

  return (
    <AnimatedSection>
      <SectionShell ref={containerRef} className="min-h-[65vh] overflow-hidden">
        <motion.div className="grid h-full content-center gap-4" style={{ y }}>
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-slate-300">
            <Sparkles size={14} /> React specialist for premium product builds
          </p>
          <h1 className="text-4xl font-bold leading-[0.95] text-slate-50 md:text-6xl">
            Ayan Malik
            <span className="mt-3 block text-lg font-medium text-slate-200 md:text-2xl">
              React Developer | Freelance Available
            </span>
          </h1>
          <p className="max-w-2xl muted">
            I craft high-performance React experiences that combine distinctive branding, smooth
            interactions, and measurable business outcomes.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <motion.a
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-cyan px-4 py-2 font-semibold text-slate-950"
            >
              Explore Projects <ArrowRight size={16} />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              href="#contact"
              className="rounded-xl border border-white/20 px-4 py-2 text-slate-100 hover:border-white/50"
            >
              Start a Project
            </motion.a>
          </div>
        </motion.div>
      </SectionShell>
    </AnimatedSection>
  )
}
