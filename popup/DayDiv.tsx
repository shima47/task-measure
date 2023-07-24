import { useState } from "react"
import { v4 as uuid } from "uuid"
import { createNewTask } from "./common"
import Task from "./Task"
import addIcon from "data-base64:~assets/add.svg"
import "../css/dayDiv.css"



function dayDiv({ dayIndex, dOfW, dayTaskOrder, ...props }) {

  const onClickNewTask = () => {
    createNewTask(props.storageProps.allTaskState, props.storageProps.orderDataState, dayIndex)
  }

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv">
        <div className="dayTitile">{dOfW}</div>
        <div className="btn" onClick={onClickNewTask}>
          <img src={addIcon} alt="新規追加" />
        </div>
      </div>
      <div className="taskDiv">
        {dayTaskOrder.map((taskId, index) => {
          return <Task key={taskId} taskId={taskId} {...props} />
        })}
      </div>
    </div>
  )
}

export default dayDiv
