import type { Request, Response } from 'express'

import {
  createProject,
  deleteProjectById,
  getProjectById,
  getProjects,
} from '../services/projectService.js'
import type { CreateProjectRequest } from '../types/project.js'
import type { PrdResponse } from '../types/prd.js'

type CreateProjectBody = CreateProjectRequest & {
  prd: PrdResponse
}

export async function getAllProjects(_req: Request, res: Response) {
  const projects = await getProjects()

  res.json({
    projects,
  })
}

export async function createNewProject(req: Request, res: Response) {
  const body = req.body as CreateProjectBody

  if (
    !body.name?.trim() ||
    !body.productIdea?.trim() ||
    !body.targetAudience?.trim() ||
    !body.primaryGoal?.trim() ||
    !body.prd
  ) {
    res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Project fields and PRD are required',
    })
    return
  }

  const { prd, ...projectData } = body

  const project = await createProject(projectData, prd)

  res.status(201).json({
    project,
  })
}

export async function getProject(req: Request, res: Response) {
  const id = req.params.id

  if (typeof id !== 'string') {
    res.status(400).json({
      code: 'INVALID_PROJECT_ID',
      message: 'Invalid project id',
    })
    return
  }

  const project = await getProjectById(id)

  if (!project) {
    res.status(404).json({
      code: 'PROJECT_NOT_FOUND',
      message: 'Project not found',
    })
    return
  }

  res.json({
    project,
  })
}

export async function deleteProject(req: Request, res: Response) {
  const id = req.params.id

  if (typeof id !== 'string') {
    res.status(400).json({
      code: 'INVALID_PROJECT_ID',
      message: 'Invalid project id',
    })
    return
  }

  try {
    await deleteProjectById(id)

    res.status(204).send()
  } catch {
    res.status(404).json({
      code: 'PROJECT_NOT_FOUND',
      message: 'Project not found',
    })
  }
}