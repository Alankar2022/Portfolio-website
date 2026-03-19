'use client'

import { motion } from 'framer-motion'
import SectionShell from '@/components/ui/SectionShell'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { skills } from '@/lib/data'

export default function SkillsSection() {
  return (
    <AnimatedSection>
      <SectionShell>
        <h2 className="section-title">Skills</h2>
        <div className="grid gap-4">
          {skills.map((skill) => (
            <motion.div key={skill.label} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <div className="mb-1 flex items-center justify-between">
                <p className="text-sm text-slate-100">{skill.label}</p>
                <span className="text-xs text-slate-300">{skill.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.value}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    </AnimatedSection>
  )
}
