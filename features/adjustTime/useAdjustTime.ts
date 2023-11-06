import { useContext, } from "react"
import * as type from "~types/type"
import * as context from "~components/Provider/MyProvider"
import useUpdateTask from "~hooks/useUpdateTask"


const useAdjustTime = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)
  const [transferTaskId, setTransferTaskId] = useContext(context.transferTaskIdContext)
  const { updateTaskTime } = useUpdateTask()

  const onClickReduceTime = () => {
    if (selectedTaskId === "") return
    const timeToAdjust = -0.25

    if (transferTaskId === "") {
      adjustTime(timeToAdjust)
    } else {
      transferTime(timeToAdjust)
    }
  }

  const onClickIncreaseTime = () => {
    if (selectedTaskId === "") return
    const timeToAdjust = 0.25

    if (transferTaskId === "") {
      adjustTime(timeToAdjust)
    } else {
      transferTime(timeToAdjust)
    }
  }

  const adjustTime = (timeToAdjust: number) => {
    const newTaskTime = (parseFloat(allTask[selectedTaskId].time) + timeToAdjust)
    updateTaskTime(selectedTaskId, newTaskTime)
  }

  const transferTime = (timeToAdjust: number) => {
    const selectedTask = allTask[selectedTaskId]
    if (!selectedTask) return
    const selectedTaskTime = (parseFloat(selectedTask.time) + timeToAdjust)
    const newSelectedTask = { ...selectedTask, time: selectedTaskTime }

    const transferedTask = allTask[transferTaskId]
    if (!transferedTask) return
    const transferedTaskTime = (parseFloat(transferedTask.time) + timeToAdjust * (-1))
    const newtransferedTask = { ...transferedTask, time: transferedTaskTime }

    setAllTask(current => {
      return {
        ...current,
        [selectedTaskId]: newSelectedTask,
        [transferTaskId]: newtransferedTask,
      }
    })

  }

  return { onClickReduceTime, onClickIncreaseTime }
}

export default useAdjustTime