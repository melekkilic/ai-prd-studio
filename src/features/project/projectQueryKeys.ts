export const projectQueryKeys = {
  all: ['projects'] as const,

  detail: (id: string) => ['projects', id] as const,
}