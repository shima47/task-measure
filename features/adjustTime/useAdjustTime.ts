import { useContext, } from "react"
import * as type from "~types/type"
import * as context from "~components/Provider/MyProvider"
import useUpdateTask from "~hooks/useUpdateTask"


const useAdjustTime = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)
  const { updateTaskTime } = useUpdateTask()

  const onClickReduceTime = () => {
    if (selectedTaskId === "") return

    const timeToAdjust = -0.25
    adjustTime(timeToAdjust)
  }

  const onClickIncreaseTime = () => {
    if (selectedTaskId === "") return

    const timeToAdjust = 0.25
    adjustTime(timeToAdjust)
  }

  const adjustTime = (timeToAdjust: number) => {
    const selectedTask = allTask[selectedTaskId]
    const newTaskTime = (parseFloat(selectedTask.time) + timeToAdjust)
    updateTaskTime(selectedTaskId, newTaskTime)
  }

  return { onClickReduceTime, onClickIncreaseTime }
}

export default useAdjustTime