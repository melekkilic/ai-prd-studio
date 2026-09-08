const sections = [
  { label: 'Overview', id: 'overview' },
  { label: 'Problem', id: 'problem' },
  { label: 'Target Users', id: 'target-users' },
  { label: 'Goals', id: 'goals' },
  { label: 'User Stories', id: 'user-stories' },
  { label: 'Requirements', id: 'requirements' },
]

function WorkspaceSidebar() {
  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <aside className="sticky top-24 h-fit w-56 shrink-0 border-r pr-6">
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className="block w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-muted"
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default WorkspaceSidebar