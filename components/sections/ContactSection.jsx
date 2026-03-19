'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import SectionShell from '@/components/ui/SectionShell'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function ContactSection() {
  return (
    <AnimatedSection>
      <SectionShell className="grid gap-3" id="contact">
        <h2 className="section-title">Contact</h2>
        <p className="max-w-2xl muted">
          Available for freelance React development, landing pages, and full product UI delivery.
        </p>
        <motion.a
          whileHover={{ y: -2, scale: 1.01 }}
          transition={{ duration: 0.2 }}
          href="mailto:hello@reactdev.com"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-cyan px-4 py-2 font-semibold text-slate-950"
        >
          <Mail size={16} /> Book a Discovery Call
        </motion.a>
      </SectionShell>
    </AnimatedSection>
  )
}
