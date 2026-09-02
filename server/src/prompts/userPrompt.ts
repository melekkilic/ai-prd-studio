import type { GeneratePrdRequest } from '../types/generatePrd.js'

export function buildUserPrompt(request: GeneratePrdRequest) {
  return `
Create a Product Requirements Document using the product information below.

Project Name:
${request.projectName}

Product Idea:
${request.productIdea}

Target Audience:
${request.targetAudience}

Primary Goal:
${request.primaryGoal}

Constraints:
${request.constraints ?? 'No constraints provided.'}
`
}