import type { Prd } from './types'

export const mockPrd: Prd = {
  summary:
    'A workspace that transforms rough product ideas into structured product requirement documents using AI.',

  problemStatement:
    'Product teams often start with incomplete or ambiguous ideas, which makes requirement definition inconsistent and time-consuming.',

  targetUsers: [
    'Product Managers',
    'Business Analysts',
    'Startup Founders',
    'Product Owners',
  ],

  goals: [
    'Generate structured PRDs from raw product ideas',
    'Reduce ambiguity in product requirements',
    'Speed up early-stage product discovery',
  ],

  nonGoals: [
    'Replace product managers or business analysts',
    'Provide project management capabilities',
    'Support real-time team collaboration in MVP',
  ],

  userStories: [
    'As a product manager, I want to generate a PRD from a product idea so that I can start product discovery faster.',
    'As a business analyst, I want structured requirements so that I can reduce ambiguity before development starts.',
  ],

  functionalRequirements: [
    'The user can create a new product project.',
    'The system can generate a structured PRD from product information.',
    'The user can view PRD sections in a workspace.',
  ],

  nonFunctionalRequirements: [
    'The application should provide responsive feedback during PRD generation.',
    'The workspace should be usable on desktop and tablet screens.',
  ],

  acceptanceCriteria: [
    'Given valid product information, when the user submits the form, then a structured PRD is displayed.',
    'Given a generated PRD, when the user opens the workspace, then all supported PRD sections are visible.',
  ],

  risks: [
    'AI-generated requirements may contain ambiguous statements.',
    'Generated content may not fully reflect the user intent.',
  ],

  openQuestions: [
    'Should users be able to regenerate individual sections?',
    'Should PRD versions be stored?',
  ],
}