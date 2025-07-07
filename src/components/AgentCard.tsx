import { Agent } from '@/types/agent'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{agent.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{agent.description}</p>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <p>
          <span className="font-medium">Status:</span> {agent.status}
        </p>
        <p>
          <span className="font-medium">Category:</span> {agent.category}
        </p>
        <p>
          <span className="font-medium">Pricing:</span> {agent.pricingModel}
        </p>
      </CardContent>
    </Card>
  )
}
