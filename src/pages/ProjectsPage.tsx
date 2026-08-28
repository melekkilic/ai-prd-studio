import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import EmptyState from '@/components/EmptyState'
import PageHeader from '@/components/PageHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { projectQueryKeys } from '@/features/project/projectQueryKeys'
import { getProjects } from '@/services/projectApi'

function ProjectsPage() {
  const navigate = useNavigate()

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: projectQueryKeys.all,
    queryFn: getProjects,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-destructive">
        Projects could not be loaded.
      </p>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create your first project to generate a PRD."
      />
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        description="View and manage your product projects."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => navigate(`/projects/${project.id}`)}
            className="rounded-lg border p-5 text-left transition hover:bg-muted"
          >
            <h2 className="font-semibold">
              {project.name}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {project.productIdea}
            </p>

            <p className="mt-4 text-xs text-muted-foreground">
              {project.targetAudience}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage