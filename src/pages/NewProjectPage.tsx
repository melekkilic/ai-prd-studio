import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormField from '@/components/FormField'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { projectQueryKeys } from '@/features/project/projectQueryKeys'
import {
  projectSchema,
  type ProjectFormData,
} from '@/features/project/projectSchema'
import { useGeneratePrd } from '@/features/prd/useGeneratePrd'
import { ApiError } from '@/services/prdApi'
import { createProject } from '@/services/projectApi'

function NewProjectPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [lastSubmittedData, setLastSubmittedData] =
    useState<ProjectFormData | null>(null)

  const generatePrdMutation = useGeneratePrd()

  const createProjectMutation = useMutation({
    mutationFn: ({
      data,
      prd,
    }: {
      data: ProjectFormData
      prd: Parameters<typeof createProject>[1]
    }) => createProject(data, prd),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.all,
      })

      navigate(`/projects/${response.project.id}`)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  async function generateProject(data: ProjectFormData) {
    try {
      const prd = await generatePrdMutation.mutateAsync({
        projectName: data.projectName,
        productIdea: data.productIdea,
        targetAudience: data.targetAudience,
        primaryGoal: data.primaryGoal,
      })

      createProjectMutation.mutate({
        data,
        prd,
      })
    } catch {
      // Mutation error state handles the UI.
    }
  }

  async function onSubmit(data: ProjectFormData) {
    setLastSubmittedData(data)

    await generateProject(data)
  }

  function handleRetry() {
    if (!lastSubmittedData) {
      return
    }

    generateProject(lastSubmittedData)
  }

  const isPending =
    generatePrdMutation.isPending || createProjectMutation.isPending

  const isError =
    generatePrdMutation.isError || createProjectMutation.isError

  const errorMessage =
    generatePrdMutation.error instanceof ApiError
      ? generatePrdMutation.error.message
      : createProjectMutation.isError
        ? 'Project could not be saved. Please try again.'
        : 'Project could not be generated. Please try again.'

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create New Project"
        description="Describe your product idea and generate a structured PRD."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl space-y-6"
      >
        <FormField
          label="Project Name"
          htmlFor="projectName"
          error={errors.projectName?.message}
        >
          <input
            id="projectName"
            {...register('projectName')}
            maxLength={100}
            className="w-full rounded-md border px-3 py-2"
            placeholder="AI Product Requirements Studio"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Maximum 100 characters.
          </p>
        </FormField>

        <FormField
          label="Product Idea"
          htmlFor="productIdea"
          error={errors.productIdea?.message}
        >
          <textarea
            id="productIdea"
            {...register('productIdea')}
            maxLength={2000}
            className="min-h-32 w-full rounded-md border px-3 py-2"
            placeholder="Describe the product you want to build..."
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Maximum 2000 characters.
          </p>
        </FormField>

        <FormField
          label="Target Audience"
          htmlFor="targetAudience"
          error={errors.targetAudience?.message}
        >
          <input
            id="targetAudience"
            {...register('targetAudience')}
            maxLength={500}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Product managers, founders..."
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Maximum 500 characters.
          </p>
        </FormField>

        <FormField
          label="Primary Goal"
          htmlFor="primaryGoal"
          error={errors.primaryGoal?.message}
        >
          <textarea
            id="primaryGoal"
            {...register('primaryGoal')}
            maxLength={1000}
            className="min-h-24 w-full rounded-md border px-3 py-2"
            placeholder="What should this product achieve?"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Maximum 1000 characters.
          </p>
        </FormField>

        {isError && (
          <div className="space-y-2">
            <p className="text-sm text-destructive">
              {errorMessage}
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={handleRetry}
              disabled={isPending || !lastSubmittedData}
            >
              Retry
            </Button>
          </div>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending && (
            <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}

          {isPending ? 'Generating PRD...' : 'Generate PRD'}
        </Button>
      </form>
    </div>
  )
}

export default NewProjectPage