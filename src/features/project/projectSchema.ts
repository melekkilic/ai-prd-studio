import { z } from 'zod'

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, 'Project name must be at least 2 characters'),

  productIdea: z
    .string()
    .min(20, 'Product idea must be at least 20 characters'),

  targetAudience: z
    .string()
    .min(2, 'Target audience is required'),

  primaryGoal: z
    .string()
    .min(5, 'Primary goal must be at least 5 characters'),
})

export type ProjectFormData = z.infer<typeof projectSchema>