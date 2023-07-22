import { useEffect, useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import { formatElapsedTime, updateTask } from "./common"
import "../css/task.css"


function Task(props) {
  const [allTask, setAllTask] = props.allTaskState
  const [orderData, setOrderData] = props.orderDataState

  const [startTime, setStartTime] = props.startTimeState
  const [doingTaskId, setDoingTaskId] = props.doingTaskState

  const task = allTask[props.taskId]
  console.dir(task)

  const doTask = doingTaskId === props.taskId //実行中のタスクかどうか

  let formatedTaskTime
  if (doTask) {
    const newTaskTime = task.time + (Date.now() - startTime)
    formatedTaskTime = formatElapsedTime(newTaskTime)
  } else {
    formatedTaskTime = formatElapsedTime(task.time)
  }

  const onChangeTitle = (event) => {
    const updatedTask = { ...task, title: event.target.value }
    updateTask(props.allTaskState, props.taskId, updatedTask)
  }

  const stopTask = () => {
    setStartTime(0)
    setDoingTaskId("")

    const newTaskTime = task.time + (Date.now() - startTime)
    const updatedTask = { ...task, time: newTaskTime, }

    updateTask(props.allTaskState, updatedTask)
  }


  const startTask = async () => {
    setStartTime(Date.now())
    setDoingTaskId(props.taskId)
  }

  return (
    <div className="task">
      <div className="taskTitle">
        <input className="taskForm" type="text" value={task.title} onChange={onChangeTitle} />
      </div>
      <div className="taskTime">{formatedTaskTime}</div>
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
    </div>
  )
}

export default Task
