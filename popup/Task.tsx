import { useEffect, useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import { millisecondsToHours, updateTaskTitle, updateTaskTime } from "./common"
import "../css/task.css"

/**
 * タスク名のInputについて
 * Inputの内容をUseStorageに依存すると、日本語入力が上手くいかない
 */

function Task(props) {
  // データ系
  const [allTask, setAllTask] = props.grobalState.allTaskState
  const [orderData, setOrderData] = props.grobalState.orderDataState
  const [startTime, setStartTime] = props.grobalState.doingTaskState
  const [doingTaskId, setDoingTaskId] = props.grobalState.startTimeState
  const [selectedTaskId, setSelectedTaskId] = props.grobalState.selectedTaskIdState

  const task = allTask[props.taskId]

  if (!task) return null

  console.dir(task)
  // ローカルのState
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskTime, setTaskTime] = useState<string>(task.time.toFixed(2))

  const [editedTaskTime, setEditedTaskTime] = useState("")
  const [isEditTaskTime, setIsEditTaskTime] = useState(false)

  const isRunningTask = doingTaskId === props.taskId //実行中のタスクかどうか
  const selected = selectedTaskId === props.taskId //選択中のタスクかどうか

  useEffect(() => {
    if (!isRunningTask) return
    // 実行中のタスクならば実行時間分を加算して保存する
    const newTaskTime = ((parseFloat(taskTime) * 3600000) + (Date.now() - startTime)) / 3600000
    updateTaskTime(props.grobalState.allTaskState, props.taskId, newTaskTime)
    setTaskTime(newTaskTime.toFixed(2))
  }, [])

  let formatedTaskTime
  if (isRunningTask) {
    const newTaskTime = task.time + (Date.now() - startTime)
    console.dir(task.time)
    console.dir(Date.now())
    console.dir(startTime)
    formatedTaskTime = millisecondsToHours(newTaskTime)
  } else {
    formatedTaskTime = millisecondsToHours(task.time)
  }

  const onChangeTitle = (event) => {
    setTaskTitle(event.target.value)
    updateTaskTitle(props.grobalState.allTaskState, props.taskId, event.target.value)
  }

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
      updateTaskTime(props.grobalState.allTaskState, props.taskId, newTaskTime)
      // 小数二桁まで四捨五入して表示用Stateに反映
      const roundedTime = newTaskTime.toFixed(2)
      setTaskTime(roundedTime)
      // 実行中のタスクなら開始時間をリセットする
      isRunningTask && setStartTime(Date.now())
    } catch (error) {
      // 小数変換に失敗したら編集中の値は保存しない
    } finally {
      setIsEditTaskTime(false)
    }
  }


  const startTask = async () => {
    if (doingTaskId) {
      // 前に実行中だったタスクに時間を記録する
      const didTask = allTask[doingTaskId]
      const newTaskTime = didTask.time + (Date.now() - startTime)
      updateTaskTime(props.grobalState.allTaskState, doingTaskId, newTaskTime)
    }

    setStartTime(Date.now())
    setDoingTaskId(props.taskId)
  }

  const stopTask = () => {
    // 実行中だったタスクに時間を記録する
    const newTaskTime = task.time + (Date.now() - startTime)
    updateTaskTime(props.grobalState.allTaskState, doingTaskId, newTaskTime)

    setStartTime(0)
    setDoingTaskId("")
  }

  const onChangeSelect = () => {
    // すでに選択済みなら選択を外す
    if (selected) {
      setSelectedTaskId("")
    } else {
      setSelectedTaskId(props.taskId)
    }
  }


  return (
    <div className={`task ${selected && "selectedTask"}`} >
      <input className="taskCheckbox" type="checkbox" checked={selected} onChange={onChangeSelect} />
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
          <div className="btn" onClick={stopTask}>
            <img src={stopIcon} alt="ストップ" />
          </div>
          :
          <div className="btn" onClick={startTask}>
            <img src={startIcon} alt="スタート" />
          </div>
      }
    </div >
  )
}

export default Task
