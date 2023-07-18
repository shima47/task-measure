import { useState } from "react"
import Task from "./Task"
import addIcon from "data-base64:~assets/add.svg"
import "../css/dayDiv.css"


function dayDiv(props) {
  const taskAry = props.task
  const [data, setData] = useState("")

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv">
        <div className="dayTitile">{props.dayTitle}</div>
        <div className="btn">
          <img src={addIcon} alt="新規追加" />
        </div>
      </div>
      {/* <div className="dayLine"></div> */}
      <div className="taskDiv">
        {taskAry.map((task) => <Task task={task} doingTaskState={props.doingTaskState} />)}
      </div>
    </div>
  )
}

export default dayDiv
