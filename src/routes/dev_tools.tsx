import { createFileRoute } from '@tanstack/react-router'
import DevTools from '../views/DevTools'

export const Route = createFileRoute('/dev_tools')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DevTools />
}
