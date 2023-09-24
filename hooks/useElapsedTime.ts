import useTask from "./useTask";
import useRunningTaskInfo from "./useRunningTaskInfo";

/**
 * 経過時間を加えたタスク時間を返すカスタムフック
 * @param {string} taskId 
 */
const useElapsedTime = (taskId: string) => {
  const task = useTask(taskId)
  const [runningTaskInfo,] = useRunningTaskInfo()

  const getElapsedTime = () => {
    if (!task) return
    const newTaskTime = ((parseFloat(task.time) * 3600000) + (Date.now() - runningTaskInfo.startTime)) / 3600000
    return newTaskTime
  }

  return { getElapsedTime } as const
}

export default useElapsedTime