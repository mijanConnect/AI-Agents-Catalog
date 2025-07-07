'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAgents } from '@/store/agentSlice'
import { RootState } from '@/store'
import { Agent } from '@/types/agent'
import AgentCard from './AgentCard'
import FilterPanel from './FilterPanel'
import { motion } from 'framer-motion'

export default function AgentList({ initialAgents }: { initialAgents: Agent[] }) {
  const dispatch = useDispatch()
  const filtered = useSelector((state: RootState) => state.agent.filtered)

  useEffect(() => {
    dispatch(setAgents(initialAgents))
  }, [initialAgents, dispatch])

  return (
    <>
      <FilterPanel />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AgentCard agent={agent} />
          </motion.div>
        ))}
      </div>
    </>
  )
}
