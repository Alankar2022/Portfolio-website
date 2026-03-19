import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import AnimatedBackdrop from '@/components/ui/AnimatedBackdrop'
import ScrollProgress from '@/components/ui/ScrollProgress'

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <AnimatedBackdrop />
      <main className="mx-auto grid w-[min(1120px,92vw)] gap-6 py-14 md:py-16">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  )
}
