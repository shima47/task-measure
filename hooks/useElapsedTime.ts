import * as type from "~types/type"
import useTask from "./useTask";
import useRunningTaskInfo from "./useRunningTaskInfo";
import { getTotalRestTime } from "~features/restTime/getTotalRestTime";


/**
 * 経過時間を加えたタスク時間を返すカスタムフック
 * @param {string} taskId 
 */
const useElapsedTime = (taskId: string) => {
  const task = useTask(taskId)
  const [runningTaskInfo,] = useRunningTaskInfo()

  // 未反映のタスク実行時間を返す
  const getElapsedTime = async () => {
    if (!task) return
    // 実行開始時間と現在時間
    const taskStartTime = runningTaskInfo.startTime
    const now = Date.now()

    // 経過時間と休憩時間のオーバーラップ合計を取得する
    const totalRestTime = await getTotalRestTime(taskStartTime, now)

    // 実行時間から休憩時間を引く（0以下なら0にする）
    const elapsedTime = (now - taskStartTime) - totalRestTime > 0 ? (now - taskStartTime) - totalRestTime : 0
    return ((parseFloat(task.time) * 3600000) + elapsedTime) / 3600000
  }


  return { getElapsedTime } as const
}

export default useElapsedTime