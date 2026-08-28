import { Router } from 'express'

import {
  createNewProject,
  getAllProjects,
  getProject,
} from '../controllers/projectController.js'

const router = Router()

router.get('/', getAllProjects)
router.get('/:id', getProject)
router.post('/', createNewProject)

export default router