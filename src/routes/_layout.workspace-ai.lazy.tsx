import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/workspace-ai')({
  component: () => <div>Hello /workspace-ai!</div>
})