import useElapsedTime from "~hooks/useElapsedTime";
import useRunningTaskInfo from "~hooks/useRunningTaskInfo";
import useUpdateTask from "~hooks/useUpdateTask";


const useRunTask = (taskId: string = "") => {
  const [runningTaskInfo, { setNewRunningTaskInfo, setRunningTaskInfoStop }] = useRunningTaskInfo()
  const { getElapsedTime } = useElapsedTime(runningTaskInfo.id)
  const { updateTaskTime } = useUpdateTask()

  const onClickStart = () => {
    // このフックに引数が渡されなければ実行しない
    if (taskId === "") return
    // 実行中だったタスクに時間を記録する
    if (runningTaskInfo.id) {
      const elapsedTime = getElapsedTime()
      updateTaskTime(runningTaskInfo.id, elapsedTime)
    }
    // 新しい実行中タスクを設定する
    setNewRunningTaskInfo(taskId)
  }

  const onClickStop = () => {
    if (runningTaskInfo.id === "") return
    // 実行中だったタスクに時間を記録する
    const elapsedTime = getElapsedTime()
    updateTaskTime(runningTaskInfo.id, elapsedTime)
    // 新しい実行中タスクを設定する
    setRunningTaskInfoStop()
  }

  return { onClickStart, onClickStop, } as const
}

export default useRunTask