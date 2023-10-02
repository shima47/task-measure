import useTask from "./useTask";
import useRunningTaskInfo from "./useRunningTaskInfo";
import { restTimeSetting } from "~features/restTime/consts";

/**
 * 経過時間を加えたタスク時間を返すカスタムフック
 * @param {string} taskId 
 */
const useElapsedTime = (taskId: string) => {
  const task = useTask(taskId)
  const [runningTaskInfo,] = useRunningTaskInfo()

  const getElapsedTime = () => {
    if (!task) return

    // 休憩開始時間
    const restStartDate = new Date()
    restStartDate.setHours(restTimeSetting.startHour)
    restStartDate.setMinutes(restTimeSetting.startMin)
    const restStartTime = restStartDate.getTime()
    // 休憩終了時間
    const restEndDate = new Date()
    restEndDate.setHours(restTimeSetting.endHour)
    restEndDate.setMinutes(restTimeSetting.endMin)
    const restEndTime = restEndDate.getTime()

    const startTime = runningTaskInfo.startTime
    const endTime = Date.now()

    // 実行時間が休憩時間と重複しないとき
    if (endTime < restStartTime || restEndTime < startTime) {
      const timeDifference = endTime - startTime
      return ((parseFloat(task.time) * 3600000) + timeDifference) / 3600000
    }
    // 実行時間が休憩時間と重複するとき
    else {
      // 開始/停止時間が休憩時間内のときその部分は加算しないので0にする
      const timeDifference1 = restStartTime - startTime < 0 ? 0 : restStartTime - startTime
      const timeDifference2 = endTime - restEndTime < 0 ? 0 : endTime - restEndTime
      const totalDifference = timeDifference1 + timeDifference2
      return ((parseFloat(task.time) * 3600000) + totalDifference) / 3600000
    }
  }

  return { getElapsedTime } as const
}

export default useElapsedTime