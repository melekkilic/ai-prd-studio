import type { ReactNode } from 'react'

type SectionProps = {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div>{children}</div>
    </section>
  )
}

export default Section