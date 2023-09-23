import { useEffect } from "react";
import useRunningTaskInfo from "./useRunningTaskInfo";
import useIsRunning from "./useIsRunning";
import useApplyTimeDiff from "./useApplyTimeDiff";


const useEffectTime = (taskId: string) => {
  const isRunning = useIsRunning(taskId)
  const [, { setStartTimeNow }] = useRunningTaskInfo()

  useEffect(() => {
    // 実行中のタスクじゃないなら終了
    if (!isRunning) return
    // 未反映の経過時間分を加算する
    useApplyTimeDiff(taskId)
    // 開始時間をリセットする
    setStartTimeNow()
  }, [])
}

export default useEffectTime