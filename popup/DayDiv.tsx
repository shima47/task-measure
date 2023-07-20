import { useState } from "react"
import Task from "./Task"
import addIcon from "data-base64:~assets/add.svg"
import "../css/dayDiv.css"


const dOfWAry = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."]

function dayDiv({ dayTask, index, ...props }) {
  const [data, setData] = useState("")

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv">
        <div className="dayTitile">{dOfWAry[index]}</div>
        <div className="btn">
          <img src={addIcon} alt="新規追加" />
        </div>
      </div>
      {/* <div className="dayLine"></div> */}
      <div className="taskDiv">
        {dayTask.map((task, index) => {
          return <Task key={index} task={task} {...props} />
        })}
      </div>
    </div>
  )
}

export default dayDiv
