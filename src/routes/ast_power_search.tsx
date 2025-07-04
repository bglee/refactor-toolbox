import { createFileRoute } from '@tanstack/react-router'
import ASTPowerSearch from '../views/ASTPowerSearch'

export const Route = createFileRoute('/ast_power_search')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ASTPowerSearch />
}
