import { forwardRef } from 'react'

const SectionShell = forwardRef(function SectionShell({ children, className = '', ...props }, ref) {
  return (
    <section ref={ref} className={`glass rounded-2xl p-5 md:p-7 ${className}`} {...props}>
      {children}
    </section>
  )
})

export default SectionShell
