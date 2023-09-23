import { useContext, } from "react";
import * as context from "~components/Provider/MyProvider";
import { INITIAL_DATA } from "~components/initialData";


const useRunningTaskInfo = () => {
  const [runningTaskInfo, setRunningTaskInfo] = useContext(context.runningTaskInfoContext)

  const setNewRunningTaskInfo = (taskId: string) => {
    setRunningTaskInfo({ id: taskId, startTime: Date.now() })
  }

  const setStartTimeNow = () => {
    setRunningTaskInfo(current => ({ ...current, startTime: Date.now() }))
  }

  const setRunningTaskInfoStop = () => {
    setRunningTaskInfo(INITIAL_DATA.RUNNING_TASK)
  }

  return [runningTaskInfo, { setNewRunningTaskInfo, setStartTimeNow, setRunningTaskInfoStop }] as const
}

export default useRunningTaskInfo