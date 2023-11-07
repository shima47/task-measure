import { useContext, } from "react"
import * as type from "~types/type"
import * as context from "~components/Provider/MyProvider"


const useTransferTime = (transferedTaskId: string) => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [selectedTaskId,] = useContext(context.selectedTaskIdContext)

  const onClickTransferTime = () => {
    if (selectedTaskId === "") return

    const timeToAdjust = 0.25
    transferTime(timeToAdjust)
  }

  const transferTime = (timeToAdjust: number) => {
    const transferedTask = allTask[transferedTaskId]
    const selectedTask = allTask[selectedTaskId]
    if (!transferedTask || !selectedTask) return

    const transferedTaskTime = (parseFloat(transferedTask.time) + timeToAdjust)
    const selectedTaskTime = (parseFloat(selectedTask.time) + timeToAdjust * (-1))

    const newTransferedTask = { ...transferedTask, time: transferedTaskTime }
    const newSelectedTask = { ...selectedTask, time: selectedTaskTime }

    // ふたつ変更する場合、一回ずつsetStateすると片方しか反映されない
    setAllTask(current => {
      return {
        ...current,
        [transferedTaskId]: newTransferedTask,
        [selectedTaskId]: newSelectedTask,
      }
    })

  }
  return { onClickTransferTime } as const
}

export default useTransferTime