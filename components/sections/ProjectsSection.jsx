'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Orbit } from 'lucide-react'
import SectionShell from '@/components/ui/SectionShell'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { projects } from '@/lib/data'

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const selected = projects[active]

  return (
    <AnimatedSection>
      <SectionShell id="projects">
        <h2 className="section-title">Projects</h2>
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-2">
            {projects.map((project, index) => (
              <motion.button
                key={project.title}
                onClick={() => setActive(index)}
                whileHover={{ x: 4, y: -1 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl border p-3 text-left ${
                  active === index
                    ? 'border-accent/70 bg-accent/10'
                    : 'border-white/15 bg-white/[0.03] hover:border-white/35'
                }`}
              >
                <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-100">
                  <Orbit size={14} /> {project.title}
                </p>
                <p className="mt-1 text-sm text-slate-300/85">{project.impact}</p>
              </motion.button>
            ))}
          </div>

          <motion.article
            key={selected.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl border border-white/20 bg-white/[0.04] p-5"
          >
            <h3 className="text-xl font-semibold text-slate-100">{selected.title}</h3>
            <p className="mt-2 muted">{selected.summary}</p>
            <p className="mt-4 font-semibold text-cyan">{selected.impact}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        </div>
      </SectionShell>
    </AnimatedSection>
  )
}
