import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
}

function PageContainer({ children }: PageContainerProps) {
  return <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
}

export default PageContainer
