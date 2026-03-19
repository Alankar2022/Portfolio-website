'use client'

export default function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <span className="absolute left-[6%] top-[14%] h-64 w-64 animate-pulse rounded-full bg-accent/30 blur-[60px]" />
      <span className="absolute right-[8%] top-[12%] h-56 w-56 animate-pulse rounded-full bg-cyan/25 blur-[60px] [animation-delay:1100ms]" />
      <span className="absolute bottom-[-4%] right-[24%] h-72 w-72 animate-pulse rounded-full bg-indigo-400/25 blur-[70px] [animation-delay:1900ms]" />
      <span className="grid-fade absolute inset-0" />
    </div>
  )
}
