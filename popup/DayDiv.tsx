import { useState } from "react"
import { v4 as uuid } from "uuid"
import Task from "./Task"
import addIcon from "data-base64:~assets/add.svg"
import "../css/dayDiv.css"



function dayDiv({ dayIndex, dOfW, dayTaskOrder, ...props }) {
  const [allTask, setAllTask] = props.allTaskState

  const createTask = () => {
    const newTask = { id: uuid(), title: "タスク", time: 0, }
    const newDayTask = [...dayTaskOrder, newTask]
    const newAllTask = allTask.map((dayTask, index) => index === dayIndex ? newDayTask : dayTask)
    setAllTask(newAllTask)
  }

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv">
        <div className="dayTitile">{dOfW}</div>
        <div className="btn" onClick={createTask}>
          <img src={addIcon} alt="新規追加" />
        </div>
      </div>
      {/* <div className="dayLine"></div> */}
      <div className="taskDiv">
        {dayTaskOrder.map((taskId, index) => {
          return <Task key={taskId} taskId={taskId} {...props} />
        })}
      </div>
    </div>
  )
}

export default dayDiv
