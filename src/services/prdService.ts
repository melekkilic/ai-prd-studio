import { mockProject } from '@/features/project/mockProject'
import type { Project } from '@/features/project/types'

export async function getProjectById(id: string): Promise<Project> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (id !== mockProject.id) {
    throw new Error('Project not found')
  }

  return mockProject
}