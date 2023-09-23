import { useContext, } from "react";
import * as context from "~components/Provider/MyProvider";


const useTask = (taskId: string) => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)

  const task = allTask[taskId]

  return task
}

export default useTask