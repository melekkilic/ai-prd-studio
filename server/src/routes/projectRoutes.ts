import { Router } from 'express'

import {
  createNewProject,
  deleteProject,
  getAllProjects,
  getProject,
} from '../controllers/projectController.js'

const router = Router()

router.get('/', getAllProjects)
router.get('/:id', getProject)
router.post('/', createNewProject)
router.delete('/:id', deleteProject)

export default router