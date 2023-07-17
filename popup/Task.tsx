import { useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import "../css/task.css"


function Task() {
  const [data, setData] = useState("")

  return (
    <div className="task">
      <div className="taskTitle">
        <input className="taskForm" />
      </div>
      <div className="taskTime">3h 20m</div>
      <div className="btn">
        <img src={startIcon} alt="新規追加" />
      </div>
    </div>
  )
}

export default Task
