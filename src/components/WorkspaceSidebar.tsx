import { Link, useParams } from 'react-router-dom'

function WorkspaceSidebar() {
  const { id } = useParams()

  return (
    <aside className="w-64 border-r p-4">
      <nav className="flex flex-col gap-2">
        <Link to={`/projects/${id}`}>Overview</Link>
        <Link to={`/projects/${id}`}>Problem</Link>
        <Link to={`/projects/${id}`}>Target Users</Link>
        <Link to={`/projects/${id}`}>Goals</Link>
        <Link to={`/projects/${id}`}>User Stories</Link>
        <Link to={`/projects/${id}`}>Requirements</Link>
      </nav>
    </aside>
  )
}

export default WorkspaceSidebar