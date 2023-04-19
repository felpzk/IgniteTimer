import { FormContainer, MinutesAmountInput, TaskInput } from "./style";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
  
  return (
      <FormContainer>
            <label htmlFor="text">Vou trabalhar em</label>
            <TaskInput
              id="text" 
              placeholder="De um nome para o seu projeto"
              list="optionOfTask"
              {...register('task')}
              disabled={!!activeCycle}
            />

            <datalist id="optionOfTask">
              <option value="Projeto 01"/>
              <option value="Projeto 02"/>
              <option value="Projeto 03"/>
              <option value="Projeto 04"/>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
              <MinutesAmountInput
              type="number" 
              id="minutesAmount" 
              step={5}
              min={1}
              max={60}
              {...register('minutesAmount', { valueAsNumber: true})}
              disabled={!!activeCycle}
              />
            <span>minutos.</span>
          </FormContainer>
  )
}

