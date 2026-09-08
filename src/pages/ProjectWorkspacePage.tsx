import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import Section from '@/components/Section'
import WorkspaceSidebar from '@/components/WorkspaceSidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { projectQueryKeys } from '@/features/project/projectQueryKeys'
import { getProjectById } from '@/services/prdService'

function ProjectWorkspacePage() {
  const { id } = useParams()

  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: projectQueryKeys.detail(id!),
    queryFn: () => getProjectById(id!),
    enabled: !!id,
  })

  if (!id) {
    return <p className="text-destructive">Project id is missing</p>
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (isError) {
    const message =
      error instanceof Error && error.message === 'PROJECT_NOT_FOUND'
        ? 'Project not found'
        : 'Project could not be loaded'

    return <p className="text-destructive">{message}</p>
  }

  if (!project) {
    return <p className="text-destructive">Project not found</p>
  }

  const { prd } = project

  return (
    <div className="flex gap-6">
      <WorkspaceSidebar />

      <main className="min-w-0 flex-1 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{project.name}</h1>

            <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
              AI-generated
            </span>
          </div>

          <p className="text-muted-foreground">
            {project.productIdea}
          </p>
        </div>

        <div id="overview">
          <Section title="Overview">
            <p>{prd.summary}</p>
          </Section>
        </div>

        <div id="problem">
          <Section title="Problem Statement">
            <p>{prd.problemStatement}</p>
          </Section>
        </div>

        <div id="target-users">
          <Section title="Target Users">
            <ul className="list-disc space-y-1 pl-5">
              {prd.targetUsers.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div id="goals">
          <Section title="Goals">
            <ul className="list-disc space-y-1 pl-5">
              {prd.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div id="user-stories">
          <Section title="User Stories">
            <ul className="space-y-3">
              {prd.userStories.map((story) => (
                <li
                  key={story}
                  className="rounded-md border p-3"
                >
                  {story}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div
          id="requirements"
          className="space-y-8"
        >
          <Section title="Functional Requirements">
            <ul className="list-disc space-y-1 pl-5">
              {prd.functionalRequirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </Section>

          <Section title="Non-Functional Requirements">
            <ul className="list-disc space-y-1 pl-5">
              {prd.nonFunctionalRequirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </Section>
        </div>
      </main>
    </div>
  )
}

export default ProjectWorkspacePage