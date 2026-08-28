import type { CreateProjectRequest } from '../types/project.js'

import { mockPrd } from '../data/mockPrd.js'
import { prisma } from '../lib/prisma.js'

export async function getProjects() {
  return prisma.project.findMany()
}

export async function createProject(data: CreateProjectRequest) {
  return prisma.project.create({
    data: {
      ...data,
      prd: {
        create: mockPrd,
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