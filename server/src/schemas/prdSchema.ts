import { z } from 'zod'

const nonEmptyString = z.string().trim().min(1)

export const prdSchema = z.object({
  summary: nonEmptyString,
  problemStatement: nonEmptyString,

  targetUsers: z.array(nonEmptyString).min(1),
  goals: z.array(nonEmptyString).min(1),

  nonGoals: z.array(nonEmptyString),

  userStories: z.array(nonEmptyString).min(1),
  functionalRequirements: z.array(nonEmptyString).min(1),
  nonFunctionalRequirements: z.array(nonEmptyString).min(1),
  acceptanceCriteria: z.array(nonEmptyString).min(1),

  risks: z.array(nonEmptyString),
  openQuestions: z.array(nonEmptyString),
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