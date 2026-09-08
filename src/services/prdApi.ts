import type { Prd } from '@/features/prd/types'

export type GeneratePrdRequest = {
  projectName: string
  productIdea: string
  targetAudience: string
  primaryGoal: string
  constraints?: string
}

type GeneratePrdResponse = {
  prd: Prd
}

export type ApiErrorResponse = {
  code: string
  message: string
}

export class ApiError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.code = code
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001'

export async function generatePrd(
  data: GeneratePrdRequest,
): Promise<Prd> {
  const response = await fetch(`${API_BASE_URL}/api/prd/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorResponse: ApiErrorResponse = await response.json()

    throw new ApiError(
      errorResponse.code,
      errorResponse.message,
    )
  }

  const result: GeneratePrdResponse = await response.json()

  return result.prd
}