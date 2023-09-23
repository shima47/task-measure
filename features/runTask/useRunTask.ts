import useApplyTimeDiff from "~hooks/useApplyTimeDiff";
import useRunningTaskInfo from "~hooks/useRunningTaskInfo";


const useRunTask = (taskId: string = "") => {
  const [runningTaskInfo, { setNewRunningTaskInfo, setRunningTaskInfoStop }] = useRunningTaskInfo()

  const onClickStart = () => {
    // このフックに引数が渡されなければ実行しない
    if (taskId === "") return
    // 実行中だったタスクに時間を記録する
    if (runningTaskInfo.id) {
      useApplyTimeDiff(runningTaskInfo.id)
    }
    // 新しい実行中タスクを設定する
    setNewRunningTaskInfo(taskId)
  }

  const onClickStop = () => {
    if (runningTaskInfo.id === "") return
    // 実行中だったタスクに時間を記録する
    useApplyTimeDiff(runningTaskInfo.id)
    // 新しい実行中タスクを設定する
    setRunningTaskInfoStop()
  }

  return { onClickStart, onClickStop, } as const
}

export default useRunTask