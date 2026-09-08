import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import EmptyState from '@/components/EmptyState'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { projectQueryKeys } from '@/features/project/projectQueryKeys'
import type { Project } from '@/features/project/types'
import {
  deleteProject,
  getProjects,
} from '@/services/projectApi'

function ProjectsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [projectToDelete, setProjectToDelete] =
    useState<Project | null>(null)

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

      setProjectToDelete(null)
    },
  })

  function handleDeleteClick(
    event: React.MouseEvent,
    project: Project,
  ) {
    event.stopPropagation()
    setProjectToDelete(project)
  }

  function handleConfirmDelete() {
    if (!projectToDelete) {
      return
    }

    deleteMutation.mutate(projectToDelete.id)
  }

  function handleCancelDelete() {
    if (deleteMutation.isPending) {
      return
    }

    setProjectToDelete(null)
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
    <>
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
              onClick={() =>
                navigate(`/projects/${project.id}`)
              }
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
                onClick={(event) =>
                  handleDeleteClick(event, project)
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

      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleCancelDelete}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl"
          >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>

            <h2
              id="delete-project-title"
              className="text-lg font-semibold"
            >
              Delete project?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">
                {projectToDelete.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={deleteMutation.isPending}
                onClick={handleCancelDelete}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={handleConfirmDelete}
              >
                {deleteMutation.isPending
                  ? 'Deleting...'
                  : 'Delete project'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectsPage