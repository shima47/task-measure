import { useState } from "react"
import { v4 as uuid } from "uuid"
import Task from "./Task"
import addIcon from "data-base64:~assets/add.svg"
import "../css/dayDiv.css"


const dOfWAry = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."]

function dayDiv({ dayIndex, dayTask, ...props }) {
  const [data, setData] = useState("")

  const createTask = () => {
    const newTask = { id: uuid(), title: "タスク", time: 0, }
    const newDayTask = [...dayTask, newTask]
    const [allTask, setAllTask] = props.allTaskState
    const newAllTask = allTask.map((dayTask, index) => index === dayIndex ? newDayTask : dayTask)
    setAllTask(newAllTask)
  }

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv">
        <div className="dayTitile">{dOfWAry[dayIndex]}</div>
        <div className="btn" onClick={createTask}>
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
