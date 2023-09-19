import { useContext, useState } from "react";
import * as context from "~components/Provider/MyProvider";
import useUpdateTask from "./useUpdateTask";


const useTaskTitle = (taskId: string) => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [taskTitle, setTaskTitle] = useState(allTask[taskId]["title"])
  const { updateTaskTitle } = useUpdateTask()

  const onChangeTitle = (event) => {
    setTaskTitle(event.target.value)
    updateTaskTitle(taskId, taskTitle)
  }

  return [taskTitle, onChangeTitle] as const
}

export default useTaskTitle