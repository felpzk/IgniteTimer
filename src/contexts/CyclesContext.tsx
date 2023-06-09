import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondPassed: number
  setSecondPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProvidersProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({ children }: CyclesContextProvidersProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null> (null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0) 

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId )

  function setSecondPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if(cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() }
      } else {
        return cycle
      }
    })
  ) 
}

function createNewCycle(data: CreateCycleData): void {
  const id = String(new Date().getTime())

  const newCycle: Cycle = {
    id: id,
    task: data.task,
    minutesAmount: data.minutesAmount,
    startDate: new Date()
  }

  setCycles((state) => [...cycles, newCycle])
  setActiveCycleId(id)
  setAmountSecondPassed(0)

  //reset()
}

function interruptCurrentCycle() {
  setCycles(state => state.map(cycle => {
    if(cycle.id === activeCycleId) {
      return { ...cycle, interruptedDate: new Date() }
    } else {
      return cycle
    }
  }))
  setActiveCycleId(null)
}


  return (
    <CyclesContext.Provider
      value={{ 
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondPassed, 
        setSecondPassed,
        createNewCycle,
        interruptCurrentCycle 
    }}>
      {children}
    </CyclesContext.Provider>
  )
}