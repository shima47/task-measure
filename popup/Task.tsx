import { useEffect, useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import { millisecondsToHours, updateTaskTitle, updateTaskTime } from "./common"
import "../css/task.css"

/**
 * タスク名のInputについて
 * Inputの内容をUseStorageに依存すると、日本語入力が上手くいかない
 * ex: テスト ->ｔｔてｔｔてｓｔｔてｔｔてｓす みたいになる
 * そこで日本語入力の間だけUseStateを利用して、入力終了時にUseStorageに切り替える運用にしている
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

  const doTask = doingTaskId === props.taskId //実行中のタスクかどうか
  const selected = selectedTaskId === props.taskId //選択中のタスクかどうか

  let formatedTaskTime
  if (doTask) {
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
    try {
      const inputTime = event.target.value
      const newTaskTime = parseFloat(inputTime) * 3600000
      updateTaskTime(props.grobalState.allTaskState, props.taskId, newTaskTime)
      doTask && setStartTime(Date.now())
    } catch (error) {

    }
  }

  const startTask = async () => {
    // 前に実行中だったタスクに時間を記録する
    const didTask = allTask[doingTaskId]
    const newTaskTime = didTask.time + (Date.now() - startTime)
    updateTaskTime(props.grobalState.allTaskState, doingTaskId, newTaskTime)

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
          value={formatedTaskTime}
          onChange={onChangeTime} />
        h
      </div>
      {
        doTask ?
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
