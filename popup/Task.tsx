import { useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import "../css/task.css"


function Task(props) {
  const task = props.task
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [taskTime, setTaskTime] = useState(task.time)

  const [doingTaskId, setDoingTaskId] = props.doingTaskState
  const doTask = doingTaskId == task.id //実行中のタスクかどうか

  const onChangeTitle = (event) => {
    setTaskTitle(event.target.value)
  }

  const stopTask = () => {
    setDoingTaskId("")
  }

  const startTask = () => {
    setDoingTaskId(task.id)
  }

  return (
    <div className="task">
      <div className="taskTitle">
        <input className="taskForm" type="text" value={taskTitle} onChange={onChangeTitle} />
      </div>
      <div className="taskTime">{taskTime}</div>
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
