import { useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import { formatElapsedTime } from "./common"
import "../css/task.css"


function Task(props) {
  const task = props.task

  const [doingTaskId, setDoingTaskId] = props.doingTaskState
  const doTask = doingTaskId == task.id //実行中のタスクかどうか

  const [startTime, setStartTime] = props.startTimeState

  const [taskTitle, setTaskTitle] = useState(task.title)

  const newTaskTime = task.time + (Date.now() - startTime)
  const formatedTaskTime = formatElapsedTime(doTask ? newTaskTime : task.time)


  const onChangeTitle = (event) => {
    setTaskTitle(event.target.value)
  }

  const stopTask = () => {
    setStartTime("")
    setDoingTaskId("")
  }

  const startTask = async () => {
    const saveObj = {
      startTime: Date.now(),
      doingTaskId: task.id
    }
    await chrome.storage.local.set(saveObj)
  }

  return (
    <div className="task">
      <div className="taskTitle">
        <input className="taskForm" type="text" value={taskTitle} onChange={onChangeTitle} />
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
