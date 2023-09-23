import { useEffect } from "react";
import useUpdateTask from "./useUpdateTask";
import useTask from "./useTask";
import useRunningTaskInfo from "./useRunningTaskInfo";
import useIsRunning from "./useIsRunning";


const useApplyTime = (taskId: string) => {
  const task = useTask(taskId)
  const isRunning = useIsRunning(taskId)
  const [runningTask, { setStartTimeNow }] = useRunningTaskInfo()
  const { updateTaskTime } = useUpdateTask()


  useEffect(() => {
    // 実行中のタスクじゃないなら終了
    if (!isRunning) return

    // 未反映の経過時間分を加算する
    const newTaskTime = ((parseFloat(task.time) * 3600000) + (Date.now() - runningTask.startTime)) / 3600000
    updateTaskTime(taskId, newTaskTime)
    // 開始時間をリセットする
    setStartTimeNow()
  }, [])
}

export default useApplyTime