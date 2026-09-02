import 'dotenv/config'

import OpenAI from 'openai'
import { systemPrompt } from '../prompts/systemPrompt.js'
import { buildUserPrompt } from '../prompts/userPrompt.js'
import type { GeneratePrdRequest } from '../types/generatePrd.js'
import type { PrdResponse } from '../types/prd.js'
import {
  prdJsonSchema,
  prdSchema,
} from '../schemas/prdSchema.js'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePrd(
  request: GeneratePrdRequest,
): Promise<PrdResponse> {
  const userPrompt = buildUserPrompt(request)

  const response = await openai.responses.create({
    model: 'gpt-5.4-mini',

    instructions: systemPrompt,

    input: userPrompt,

    text: {
      format: {
        type: 'json_schema',
        name: 'prd_response',
        schema: prdJsonSchema,
        strict: true,
      },
    },
  })

const parsedResponse = JSON.parse(response.output_text)

const validatedPrd = prdSchema.parse(parsedResponse)

return validatedPrd}