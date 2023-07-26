import { useState } from "react"
import { v4 as uuid } from "uuid"
import { createNewTask } from "./common"
import Task from "./Task"
import addIcon from "data-base64:~assets/add.svg"
import accordionIcon from "data-base64:~assets/accordion.svg"
import "../css/dayDiv.css"



function dayDiv({ dayIndex, dOfW, dayTaskOrder, ...props }) {
  const [isOpenAry, setIsOpenAry] = props.grobalState.isOpenAryState
  const isOpen = isOpenAry[dayIndex]

  const onClickDayTitle = () => {
    const newIsOpenAry = [...isOpenAry]
    newIsOpenAry[dayIndex] = !isOpenAry[dayIndex]
    setIsOpenAry(newIsOpenAry)
  }

  const onClickNewTask = () => {
    createNewTask(props.grobalState.allTaskState, props.grobalState.orderDataState, dayIndex)
  }

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv" onClick={onClickDayTitle}>
        <div className="dayTitile">
          <img className={isOpen ? "accordionOpen" : "accordionClose"} src={accordionIcon} alt="開く" />
          {dOfW}
        </div>
        <div className="btn" onClick={onClickNewTask}>
          <img src={addIcon} alt="新規追加" />
        </div>
      </div>
      <div className="taskDiv">
        {
          isOpen ?
            dayTaskOrder.map((taskId, index) => {
              return <Task key={taskId} taskId={taskId} {...props} />
            })
            :
            <></>
        }
      </div>
    </div>
  )
}

export default dayDiv
