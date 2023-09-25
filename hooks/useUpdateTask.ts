import { useContext } from "react";
import * as context from "~components/Provider/MyProvider";


const useUpdateTask = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)

  const updateTaskTitle = (taskId: string, newTaskTitle: string) => {
    const targetTask = allTask[taskId]
    if (!targetTask) return
    
    const updatedTask = { ...targetTask, title: newTaskTitle }
    setAllTask(current => ({ ...current, [taskId]: updatedTask, }))
  }

  const updateTaskTime = (taskId: string, newTaskTime: number) => {
    const targetTask = allTask[taskId]
    if (!targetTask) return

    const updatedTask = { ...targetTask, time: newTaskTime, }
    setAllTask(current => ({ ...current, [taskId]: updatedTask, }))
  }

  return { updateTaskTitle, updateTaskTime, } as const
}

export default useUpdateTask