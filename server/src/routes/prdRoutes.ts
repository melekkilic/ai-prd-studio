import { Router } from 'express'

import { generatePrd } from '../services/aiService.js'
import type { GeneratePrdRequest } from '../types/generatePrd.js'

const router = Router()

router.post('/generate', async (req, res) => {
  try {
    const request = req.body as GeneratePrdRequest

    if (
      !request.projectName?.trim() ||
      !request.productIdea?.trim() ||
      !request.targetAudience?.trim() ||
      !request.primaryGoal?.trim()
    ) {
      res.status(400).json({
        message: 'All required fields must be provided.',
      })
      return
    }

    const prd = await generatePrd(request)

    res.json({
      prd,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'PRD could not be generated',
    })
  }
})

export default router