import { useContext, useState, } from "react";
import useTask from "~hooks/useTask";
import useUpdateTask from "~hooks/useUpdateTask";
import * as context from "~components/Provider/MyProvider";


const useScheduleTime = (taskId: string) => {
  const task = useTask(taskId)

  const [isEdit, setIsEdit] = useState(false)
  const [editedScheduleTime, setEditedScheduleTime] = useState("")

  const { updateScheduleTime } = useUpdateTask()

  const [, setSelectedTaskId] = useContext(context.selectedTaskIdContext)

  const onFocusScheduleTime = (event) => {
    // focus時に編集中に変更する
    setIsEdit(true)
    // 現在のフォーム内容を編集フォームに渡す
    setEditedScheduleTime(event.target.value)
    // タスクを選択状態にする
    setSelectedTaskId(taskId)
  }

  const onChangeScheduleTime = (event) => {
    setEditedScheduleTime(event.target.value)
  }

  const onBlurScheduleTime = (event) => {
    try {
      // 編集内容を小数に変換する
      const newScheduleTime = parseFloat(event.target.value)
      // 小数変換に失敗したら編集中の値は保存しない
      if (isNaN(newScheduleTime)) { throw new Error() }
      // DBに保存
      updateScheduleTime(taskId, newScheduleTime)
    } catch (error) {
      // 小数変換に失敗したら編集中の値は保存しない
    } finally {
      setIsEdit(false)
    }
  }

  const scheduleTime = isEdit ? editedScheduleTime : task.schedule.toFixed(2)
  return [scheduleTime, { onFocusScheduleTime, onChangeScheduleTime, onBlurScheduleTime, }] as const
}

export default useScheduleTime