import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import FormField from '@/components/FormField'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import {
  projectSchema,
  type ProjectFormData,
} from '@/features/project/projectSchema'

function NewProjectPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

function onSubmit(data: ProjectFormData) {
  console.log('Project form submitted:', data)

  navigate('/projects/mock-project-1')
}

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
            className="w-full rounded-md border px-3 py-2"
            placeholder="AI Product Requirements Studio"
          />
        </FormField>

        <FormField
          label="Product Idea"
          htmlFor="productIdea"
          error={errors.productIdea?.message}
        >
          <textarea
            id="productIdea"
            {...register('productIdea')}
            className="min-h-32 w-full rounded-md border px-3 py-2"
            placeholder="Describe the product you want to build..."
          />
        </FormField>

        <FormField
          label="Target Audience"
          htmlFor="targetAudience"
          error={errors.targetAudience?.message}
        >
          <input
            id="targetAudience"
            {...register('targetAudience')}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Product managers, founders..."
          />
        </FormField>

        <FormField
          label="Primary Goal"
          htmlFor="primaryGoal"
          error={errors.primaryGoal?.message}
        >
          <textarea
            id="primaryGoal"
            {...register('primaryGoal')}
            className="min-h-24 w-full rounded-md border px-3 py-2"
            placeholder="What should this product achieve?"
          />
        </FormField>

        <Button type="submit">
          Generate Mock PRD
        </Button>
      </form>
    </div>
  )
}

export default NewProjectPage