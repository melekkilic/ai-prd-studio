import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Section from '@/components/Section'
import WorkspaceSidebar from '@/components/WorkspaceSidebar'
import { Skeleton } from '@/components/ui/skeleton'
import type { Project } from '@/features/project/types'
import { getProjectById } from '@/services/prdService'

function ProjectWorkspacePage() {
  const { id } = useParams()

  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      if (!id) {
        setError('Project id is missing')
        setIsLoading(false)
        return
      }

      try {
        const data = await getProjectById(id)
        setProject(data)
      } catch {
        setError('Project could not be loaded')
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [id])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <p className="text-destructive">
        {error ?? 'Project not found'}
      </p>
    )
  }

  const { prd } = project

  return (
    <div className="flex gap-6">
      <WorkspaceSidebar />

      <main className="min-w-0 flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-muted-foreground">{project.productIdea}</p>
        </div>

        <Section title="Overview">
          <p>{prd.summary}</p>
        </Section>

        <Section title="Problem Statement">
          <p>{prd.problemStatement}</p>
        </Section>

        <Section title="Target Users">
          <ul className="list-disc space-y-1 pl-5">
            {prd.targetUsers.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </Section>

        <Section title="Goals">
          <ul className="list-disc space-y-1 pl-5">
            {prd.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </Section>

        <Section title="User Stories">
          <ul className="space-y-3">
            {prd.userStories.map((story) => (
              <li key={story} className="rounded-md border p-3">
                {story}
              </li>
            ))}
          </ul>
        </Section>

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
      </main>
    </div>
  )
}

export default ProjectWorkspacePage