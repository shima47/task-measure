import { useContext, useState } from "react";
import * as context from "~components/Provider/MyProvider";
import useUpdateTask from "~hooks/useUpdateTask";


const useTaskTitle = (taskId: string) => {
  const [allTask,] = useContext(context.allTaskContext)
  const [taskTitle, setTaskTitle] = useState(allTask[taskId]["title"])
  const { updateTaskTitle } = useUpdateTask()

  const onChangeTitle = (event) => {
    updateTaskTitle(taskId, event.target.value)
    setTaskTitle(event.target.value)
  }

  return [taskTitle, onChangeTitle] as const
}

export default useTaskTitle