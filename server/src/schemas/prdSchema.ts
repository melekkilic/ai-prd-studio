import { z } from 'zod'

export const prdSchema = z.object({
  summary: z.string(),
  problemStatement: z.string(),
  targetUsers: z.array(z.string()),
  goals: z.array(z.string()),
  nonGoals: z.array(z.string()),
  userStories: z.array(z.string()),
  functionalRequirements: z.array(z.string()),
  nonFunctionalRequirements: z.array(z.string()),
  acceptanceCriteria: z.array(z.string()),
  risks: z.array(z.string()),
  openQuestions: z.array(z.string()),
})

export const prdJsonSchema = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    problemStatement: { type: 'string' },
    targetUsers: {
      type: 'array',
      items: { type: 'string' },
    },
    goals: {
      type: 'array',
      items: { type: 'string' },
    },
    nonGoals: {
      type: 'array',
      items: { type: 'string' },
    },
    userStories: {
      type: 'array',
      items: { type: 'string' },
    },
    functionalRequirements: {
      type: 'array',
      items: { type: 'string' },
    },
    nonFunctionalRequirements: {
      type: 'array',
      items: { type: 'string' },
    },
    acceptanceCriteria: {
      type: 'array',
      items: { type: 'string' },
    },
    risks: {
      type: 'array',
      items: { type: 'string' },
    },
    openQuestions: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: [
    'summary',
    'problemStatement',
    'targetUsers',
    'goals',
    'nonGoals',
    'userStories',
    'functionalRequirements',
    'nonFunctionalRequirements',
    'acceptanceCriteria',
    'risks',
    'openQuestions',
  ],
  additionalProperties: false,
} as const