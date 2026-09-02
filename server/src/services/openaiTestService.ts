import 'dotenv/config'

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function testOpenAIConnection() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing')
  }

  const response = await openai.responses.create({
    model: 'gpt-5.4-mini',
    input: 'Reply with exactly: OpenAI connection successful',
  })

  return response.output_text
}