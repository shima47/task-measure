import { useState, } from "react";
import useTask from "./useTask";
import useUpdateTask from "./useUpdateTask";
import useIsRunning from "./useIsRunning";
import useRunningTaskInfo from "./useRunningTaskInfo";


const useTaskTime = (taskId: string) => {
  const task = useTask(taskId)

  const [isEdit, setIsEdit] = useState(false)
  const [editedTaskTime, setEditedTaskTime] = useState("")

  const isRunning = useIsRunning(taskId)
  const { updateTaskTime } = useUpdateTask()
  const [, { setStartTimeNow }] = useRunningTaskInfo()


  const onFocusTaskTime = (event) => {
    // focus時に編集中に変更する
    setIsEdit(true)
    // 現在のフォーム内容を編集フォームに渡す
    setEditedTaskTime(event.target.value)
  }

  const onChangeTaskTime = (event) => {
    setEditedTaskTime(event.target.value)
  }

  const onBlurTaskTime = (event) => {
    try {
      // 編集内容を小数に変換する
      const newTaskTime = parseFloat(event.target.value)
      // 小数変換に失敗したら編集中の値は保存しない
      if (isNaN(newTaskTime)) { throw new Error() }
      // DBに保存
      updateTaskTime(taskId, newTaskTime)
      // 実行中のタスクなら開始時間をリセットする
      isRunning && setStartTimeNow()
    } catch (error) {
      // 小数変換に失敗したら編集中の値は保存しない
    } finally {
      setIsEdit(false)
    }
  }

  const taskTime = isEdit ? editedTaskTime : task.time
  return [taskTime, { onFocusTaskTime, onChangeTaskTime, onBlurTaskTime, }] as const
}

export default useTaskTime