import { Router } from 'express'
import OpenAI from 'openai'

import { generatePrd } from '../services/aiService.js'
import type { ApiErrorResponse } from '../types/apiError.js'
import type { GeneratePrdRequest } from '../types/generatePrd.js'
import type { PrdResponse } from '../types/prd.js'

const router = Router()

type GeneratePrdResponse = {
  prd: PrdResponse
}

router.post('/generate', async (req, res) => {
  try {
    const request = req.body as GeneratePrdRequest

    if (
      !request.projectName?.trim() ||
      !request.productIdea?.trim() ||
      !request.targetAudience?.trim() ||
      !request.primaryGoal?.trim()
    ) {
      const errorResponse: ApiErrorResponse = {
        code: 'VALIDATION_ERROR',
        message: 'All required fields must be provided.',
      }

      res.status(400).json(errorResponse)
      return
    }

    if (
      request.projectName.length > 100 ||
      request.productIdea.length > 2000 ||
      request.targetAudience.length > 500 ||
      request.primaryGoal.length > 1000 ||
      (request.constraints && request.constraints.length > 1000)
    ) {
      const errorResponse: ApiErrorResponse = {
        code: 'VALIDATION_ERROR',
        message: 'One or more fields exceed the allowed length.',
      }

      res.status(400).json(errorResponse)
      return
    }

    const prd = await generatePrd(request)

    const response: GeneratePrdResponse = {
      prd,
    }

    res.json(response)
  } catch (error) {
    console.error(error)

    if (error instanceof OpenAI.RateLimitError) {
      const errorResponse: ApiErrorResponse = {
        code: 'AI_RATE_LIMIT',
        message:
          'PRD generation is temporarily unavailable. Please try again shortly.',
      }

      res.status(429).json(errorResponse)
      return
    }

    if (error instanceof OpenAI.APIConnectionTimeoutError) {
      const errorResponse: ApiErrorResponse = {
        code: 'AI_TIMEOUT',
        message:
          'PRD generation took too long. Please try again.',
      }

      res.status(504).json(errorResponse)
      return
    }

    if (error instanceof OpenAI.APIError) {
      const errorResponse: ApiErrorResponse = {
        code: 'AI_PROVIDER_ERROR',
        message:
          'PRD generation is temporarily unavailable. Please try again.',
      }

      res.status(502).json(errorResponse)
      return
    }

    const errorResponse: ApiErrorResponse = {
      code: 'PRD_GENERATION_FAILED',
      message: 'PRD could not be generated. Please try again.',
    }

    res.status(500).json(errorResponse)
  }
})

export default router