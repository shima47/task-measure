import { useContext, useEffect, useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import * as context from "~components/Provider/MyProvider"
import useUpdateTask from "~hooks/useUpdateTask"
import useRunTask from "~features/runTask/useRunTask"
import useTaskTitle from "~hooks/useTaskTitle"
import useSelectTask from "~hooks/useSelectTask"
import useTask from "~hooks/useTask"


/**
 * タスク名のInputについて
 * Inputの内容をUseStorageに依存すると、日本語入力が上手くいかない
 */
function Task({ taskId }) {
  // データ系
  const task = useTask(taskId)
  const [runningTask, setRunningTask] = useContext(context.runningTaskContext)

  const { updateTaskTime } = useUpdateTask()
  const { onClickStart, onClickStop, } = useRunTask(taskId)


  if (!task) return null

  console.dir(task)
  // ローカルのState
  const [taskTitle, onChangeTitle] = useTaskTitle(taskId)

  const [editedTaskTime, setEditedTaskTime] = useState("")
  const [isEditTaskTime, setIsEditTaskTime] = useState(false)

  const isRunningTask = runningTask.id === taskId //実行中のタスクかどうか
  const [isSelected, onChangeSelect] = useSelectTask(taskId)

  const taskTime = task.time.toFixed(2)

  // 実行中のタスクは実行時間を更新する
  useEffect(() => {
    if (!isRunningTask) return
    // 実行中のタスクならば実行時間分を加算して保存する
    const newTaskTime = ((parseFloat(taskTime) * 3600000) + (Date.now() - runningTask.startTime)) / 3600000
    console.log(taskTime)
    updateTaskTime(taskId, newTaskTime)
    // 開始時間をリセットする
    isRunningTask && setRunningTask(current => ({ ...current, startTime: Date.now(), }))
  }, [])

  const onChangeTime = (event) => {
    setEditedTaskTime(event.target.value)
  }

  const onFocusTaskTime = () => {
    // focus時に編集中に変更する
    setIsEditTaskTime(true)
    // 現在のフォーム内容を編集フォームに渡す
    setEditedTaskTime(taskTime)
  }

  const onBlurTaskTime = () => {
    try {
      // 編集内容を小数に変換する
      const newTaskTime = parseFloat(editedTaskTime)
      // 小数変換に失敗したら編集中の値は保存しない
      if (isNaN(newTaskTime)) { throw new Error("NaN") }
      // DBに保存
      updateTaskTime(taskId, newTaskTime)
      // // 小数二桁まで四捨五入して表示用Stateに反映
      // const roundedTime = newTaskTime.toFixed(2)
      // setTaskTime(roundedTime)
      // 実行中のタスクなら開始時間をリセットする
      isRunningTask && setRunningTask(current => ({ ...current, startTime: Date.now(), }))
    } catch (error) {
      // 小数変換に失敗したら編集中の値は保存しない
    } finally {
      setIsEditTaskTime(false)
    }
  }


  return (
    <div className={`task ${isSelected && "selectedTask"}`} >
      <input
        className="taskCheckbox"
        type="checkbox"
        checked={isSelected}
        onChange={onChangeSelect}
      />
      <div className="taskTitle">
        <input
          className="taskForm"
          type="text"
          value={taskTitle}
          onChange={onChangeTitle} />
      </div>
      <div className="taskTime">
        <input
          className="taskTimeForm"
          type="text"
          value={isEditTaskTime ? editedTaskTime : taskTime}
          onChange={onChangeTime}
          onFocus={onFocusTaskTime}
          onBlur={onBlurTaskTime}
        />
        h
      </div>
      {
        isRunningTask ?
          <div className="btn" onClick={onClickStop}>
            <img src={stopIcon} alt="ストップ" />
          </div>
          :
          <div className="btn" onClick={onClickStart}>
            <img src={startIcon} alt="スタート" />
          </div>
      }
    </div >
  )
}

export default Task
