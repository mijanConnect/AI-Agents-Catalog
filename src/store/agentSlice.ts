import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Agent } from '@/types/agent'

type FilterState = {
  search: string
  status: string[]
  category: string[]
  pricingModel: string
}

interface AgentState {
  agents: Agent[]
  filtered: Agent[]
  filters: FilterState
}

const initialState: AgentState = {
  agents: [],
  filtered: [],
  filters: {
    search: '',
    status: [],
    category: [],
    pricingModel: '',
  },
}

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgents(state, action: PayloadAction<Agent[]>) {
      state.agents = action.payload
      state.filtered = action.payload
    },
    updateFilters(state, action: PayloadAction<Partial<FilterState>>) {
      state.filters = { ...state.filters, ...action.payload }
      const { search, status, category, pricingModel } = state.filters
      state.filtered = state.agents.filter((agent) => {
        const matchesSearch =
          agent.name.toLowerCase().includes(search.toLowerCase()) ||
          agent.description.toLowerCase().includes(search.toLowerCase())
        const matchesStatus =
          status.length === 0 || status.includes(agent.status)
        const matchesCategory =
          category.length === 0 || category.includes(agent.category)
        const matchesPricing =
          pricingModel === '' || agent.pricingModel === pricingModel
        return (
          matchesSearch && matchesStatus && matchesCategory && matchesPricing
        )
      })
    },
    clearFilters(state) {
      state.filters = initialState.filters
      state.filtered = state.agents
    },
  },
})

export const { setAgents, updateFilters, clearFilters } = agentSlice.actions
export default agentSlice.reducer
