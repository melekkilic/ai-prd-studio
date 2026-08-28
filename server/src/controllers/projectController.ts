import type { Request, Response } from 'express'

import {
  createProject,
  getProjectById,
  getProjects,
} from '../services/projectService.js'
import type { CreateProjectRequest } from '../types/project.js'

export async function getAllProjects(_req: Request, res: Response) {
  const projects = await getProjects()

  res.json({
    projects,
  })
}

export async function createNewProject(req: Request, res: Response) {
  const data = req.body as CreateProjectRequest

  if (
    !data.name ||
    !data.productIdea ||
    !data.targetAudience ||
    !data.primaryGoal
  ) {
    res.status(400).json({
      message: 'All project fields are required',
    })
    return
  }

  const project = await createProject(data)

  res.status(201).json({
    project,
  })
}

export async function getProject(req: Request, res: Response) {
  const id = req.params.id

  if (typeof id !== 'string') {
    res.status(400).json({
      message: 'Invalid project id',
    })
    return
  }

  const project = await getProjectById(id)

  if (!project) {
    res.status(404).json({
      message: 'Project not found',
    })
    return
  }

  res.json({
    project,
  })
}