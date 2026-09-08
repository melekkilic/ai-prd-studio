import type { CreateProjectRequest } from '../types/project.js'
import type { PrdResponse } from '../types/prd.js'

import { prisma } from '../lib/prisma.js'

export async function getProjects() {
  return prisma.project.findMany()
}

export async function createProject(
  data: CreateProjectRequest,
  prd: PrdResponse,
) {
  return prisma.project.create({
    data: {
      ...data,
      prd: {
        create: prd,
      },
    },
    include: {
      prd: true,
    },
  })
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      prd: true,
    },
  })
}

export async function deleteProjectById(id: string) {
  return prisma.project.delete({
    where: {
      id,
    },
  })
}