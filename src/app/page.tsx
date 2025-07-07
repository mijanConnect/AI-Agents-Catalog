import AgentList from '@/components/AgentList'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Agent } from '@/types/agent'

async function getAgents(): Promise<Agent[]> {
  const filePath = join(process.cwd(), 'public', 'mock-agents.json')
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const data = await readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export default async function HomePage() {
  const agents = await getAgents()

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ArkLab AI Agents Catalog</h1>
      <AgentList initialAgents={agents} />
    </main>
  )
}
