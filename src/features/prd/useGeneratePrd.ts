import { useMutation } from '@tanstack/react-query'

import { generatePrd } from '@/services/prdApi'

export function useGeneratePrd() {
  return useMutation({
    mutationFn: generatePrd,
  })
}