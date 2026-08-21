import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5" />
          PRD Studio
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/projects"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Projects
          </Link>

          <Button asChild size="sm">
            <Link to="/projects/new">New Project</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header