import { Router } from 'express'

import { generatePrd } from '../services/aiService.js'

const router = Router()

router.get('/test', async (_req, res) => {
  try {
const result = await generatePrd({
  projectName: 'StudyBuddy',
  productIdea:
    'A study planning application where university students create subjects, add exam dates, and see a weekly study plan.',
  targetAudience: 'University students',
  primaryGoal:
    'Help students organize upcoming exams and decide what to study each week.',
  constraints:
    'The first version should only support subject creation, exam dates, and weekly study planning. It should not include social features, AI tutoring, video lessons, or teacher accounts.',
})

    res.json({
      message: result,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'OpenAI connection failed',
    })
  }
})

export default router