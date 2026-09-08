import type { Prd } from '@/features/prd/types'
import type { ProjectFormData } from '@/features/project/projectSchema'
import type { Project } from '@/features/project/types'

type CreateProjectResponse = {
  project: Project
}

type ProjectsApiResponse = {
  projects: Project[]
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001'

export async function createProject(
  data: ProjectFormData,
  prd: Prd,
): Promise<CreateProjectResponse> {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.projectName,
      productIdea: data.productIdea,
      targetAudience: data.targetAudience,
      primaryGoal: data.primaryGoal,
      prd,
    }),
  })

  if (!response.ok) {
    throw new Error('Project could not be created')
  }

  return response.json()
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects`)

  if (!response.ok) {
    throw new Error('Projects could not be loaded')
  }

  const data: ProjectsApiResponse = await response.json()

  return data.projects
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Project could not be deleted')
  }
}