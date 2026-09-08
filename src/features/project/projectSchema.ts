import { z } from 'zod'

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Project name must be 100 characters or less'),

  productIdea: z
    .string()
    .min(1, 'Product idea is required')
    .max(2000, 'Product idea must be 2000 characters or less'),

  targetAudience: z
    .string()
    .min(1, 'Target audience is required')
    .max(500, 'Target audience must be 500 characters or less'),

  primaryGoal: z
    .string()
    .min(1, 'Primary goal is required')
    .max(1000, 'Primary goal must be 1000 characters or less'),
})

export type ProjectFormData = z.infer<typeof projectSchema>