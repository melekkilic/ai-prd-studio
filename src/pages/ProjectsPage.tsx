import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import EmptyState from '@/components/EmptyState'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { projectQueryKeys } from '@/features/project/projectQueryKeys'
import {
  deleteProject,
  getProjects,
} from '@/services/projectApi'

function ProjectsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: projectQueryKeys.all,
    queryFn: getProjects,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.all,
      })
    },
  })

  function handleDelete(
    event: React.MouseEvent,
    id: string,
    projectName: string,
  ) {
    event.stopPropagation()

    const confirmed = window.confirm(
      `Are you sure you want to delete "${projectName}"?`,
    )

    if (!confirmed) {
      return
    }

    deleteMutation.mutate(id)
  }

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
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/projects/${project.id}`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                navigate(`/projects/${project.id}`)
              }
            }}
            className="group relative cursor-pointer rounded-lg border p-5 text-left transition hover:bg-muted"
          >
            <div className="pr-10">
              <h2 className="font-semibold">
                {project.name}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {project.productIdea}
              </p>

              <p className="mt-4 text-xs text-muted-foreground">
                {project.targetAudience}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 opacity-70 transition hover:text-destructive group-hover:opacity-100"
              disabled={deleteMutation.isPending}
              onClick={(event) =>
                handleDelete(
                  event,
                  project.id,
                  project.name,
                )
              }
              aria-label={`Delete ${project.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {deleteMutation.isError && (
        <p className="text-sm text-destructive">
          Project could not be deleted. Please try again.
        </p>
      )}
    </div>
  )
}

export default ProjectsPage