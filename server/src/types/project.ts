export type Project = {
  id: string
  name: string
  productIdea: string
  targetAudience: string
  primaryGoal: string
}

export type CreateProjectRequest = Omit<Project, 'id'>

export type CreateProjectResponse = {
  project: Project
}