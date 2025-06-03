export const productQueryKeys = {
  all: ['products'] as const,
  list: (params?: { limit?: number }) => [...productQueryKeys.all, params] as const,
};
