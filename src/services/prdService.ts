import type { Project } from '@/features/project/types'

type ProjectApiResponse = {
  project: Project
}
export async function getProjectById(id: string): Promise<Project> {
  const response = await fetch(`http://localhost:3001/api/projects/${id}`)

  if (response.status === 404) {
    throw new Error('PROJECT_NOT_FOUND')
  }

  if (!response.ok) {
    throw new Error('PROJECT_LOAD_FAILED')
  }

  const data: ProjectApiResponse = await response.json()

  return data.project
}