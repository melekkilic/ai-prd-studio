import type { Prd } from '@/features/prd/types'

export type Project = {
  id: string
  name: string
  productIdea: string
  targetAudience: string
  primaryGoal: string
  prd: Prd
}