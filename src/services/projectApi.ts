import type { ProjectFormData } from '@/features/project/projectSchema'
import type { Project } from '@/features/project/types'

type CreateProjectResponse = {
  project: Project
}

type ProjectsApiResponse = {
  projects: Project[]
}

export async function createProject(
  data: ProjectFormData,
): Promise<CreateProjectResponse> {
  const response = await fetch('http://localhost:3001/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.projectName,
      productIdea: data.productIdea,
      targetAudience: data.targetAudience,
      primaryGoal: data.primaryGoal,
    }),
  })

  if (!response.ok) {
    throw new Error('Project could not be created')
  }

  return response.json()
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch('http://localhost:3001/api/projects')

  if (!response.ok) {
    throw new Error('Projects could not be loaded')
  }

  const data: ProjectsApiResponse = await response.json()

  return data.projects
}