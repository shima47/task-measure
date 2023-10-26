import { useEffect, } from "react";
import useUpdateTask from "./useUpdateTask";
import useIsRunning from "./useIsRunning";
import useRunningTaskInfo from "./useRunningTaskInfo";
import useElapsedTime from "./useElapsedTime";


const useEffectTime = (taskId: string) => {
  const isRunning = useIsRunning(taskId)
  const { getElapsedTime } = useElapsedTime(taskId)
  const { updateTaskTime } = useUpdateTask()
  const [, { setStartTimeNow }] = useRunningTaskInfo()

  // 実行中のタスクは実行時間を更新する
  useEffect(() => { effectFn() }, [])

  const effectFn = async () => {
    // 実行中のタスクじゃないなら終了
    if (!isRunning) return
    // 未反映の経過時間分を加算する
    const elapsedTime = await getElapsedTime()
    updateTaskTime(taskId, elapsedTime)
    // 開始時間をリセットする
    setStartTimeNow()
  }
}

export default useEffectTime