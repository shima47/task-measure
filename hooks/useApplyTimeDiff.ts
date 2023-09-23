import useTask from "./useTask";
import useRunningTaskInfo from "./useRunningTaskInfo";
import useUpdateTask from "./useUpdateTask";

/**
 * タスク開始時間と現在時刻の差分をタスクに反映させるカスタムフック
 * @param {string} taskId 
 */
const useApplyTimeDiff = (taskId: string) => {
  const task = useTask(taskId)
  const [runningTaskInfo,] = useRunningTaskInfo()
  const { updateTaskTime } = useUpdateTask()

  const newTaskTime = ((parseFloat(task.time) * 3600000) + (Date.now() - runningTaskInfo.startTime)) / 3600000
  updateTaskTime(taskId, newTaskTime)
}

export default useApplyTimeDiff