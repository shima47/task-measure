import { useContext, } from "react"
import * as type from "~types/type"
import * as context from "~components/Provider/MyProvider"


const useAdjustTime = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)


  const onClickRewind = () => {
    if (selectedTaskId === "") return

    const timeToAdjust = -0.25
    adjustTime(timeToAdjust)
  }

  const onClickForward = () => {
    if (selectedTaskId === "") return

    const timeToAdjust = 0.25
    adjustTime(timeToAdjust)
  }

  const adjustTime = (timeToAdjust: number) => {
    const selectedTask = allTask[selectedTaskId]
    const newTaskTime = (parseFloat(selectedTask.time) + timeToAdjust)
    updateTaskTime(selectedTaskId, newTaskTime)
  }

  const updateTaskTime = (taskId: string, newTaskTime: number) => {
    const targetTask = allTask[taskId]
    if (!targetTask) return

    const updatedTask = { ...targetTask, time: newTaskTime, }
    console.log(updatedTask)
    setAllTask(current => ({ ...current, [taskId]: updatedTask, }))
  }

  return { onClickRewind, onClickForward }
}

export default useAdjustTime