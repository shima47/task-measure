import { useContext, } from "react";
import * as context from "~components/Provider/MyProvider";


const useIsRunning = (taskId: string) => {
  const [runningTaskInfo] = useContext(context.runningTaskInfoContext)

  const isRunning = taskId === runningTaskInfo.id

  return isRunning
}

export default useIsRunning