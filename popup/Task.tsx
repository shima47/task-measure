import { useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import "../css/task.css"


function Task(props) {
  const [taskTitle, setTaskTitle] = useState("")
  const [taskTime, setTaskTime] = useState("00h 00m")
  const [doTask, setDoTask] = useState(false)

  const onChangeTitle = (event) => {
    setTaskTitle(event.target.value)
  }

  const stopTask = () => {
    setDoTask(current => !current)
  }

  const startTask = () => {
    setDoTask(current => !current)

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
