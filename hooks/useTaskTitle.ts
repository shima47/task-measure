import { useContext, useState } from "react";
import * as context from "~components/Provider/MyProvider";
import useUpdateTask from "~hooks/useUpdateTask";


const useTaskTitle = (taskId: string) => {
  const [allTask,] = useContext(context.allTaskContext)
  const [taskTitle, setTaskTitle] = useState(allTask[taskId]["title"])
  const [, setSelectedTaskId] = useContext(context.selectedTaskIdContext)
  const { updateTaskTitle } = useUpdateTask()

  const onChangeTitle = (event) => {
    updateTaskTitle(taskId, event.target.value)
    setTaskTitle(event.target.value)
  }

  const onFocusTitle = (event) => {
    setSelectedTaskId(taskId)
  }

  return [taskTitle, { onChangeTitle, onFocusTitle, }] as const
}

export default useTaskTitle