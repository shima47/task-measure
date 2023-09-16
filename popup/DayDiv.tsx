import { useState } from "react"
import { v4 as uuid } from "uuid"
import { createNewTask, getTotalDayTime } from "./common"
import Task from "./Task"
import addIcon from "data-base64:~assets/add.svg"
import accordionIcon from "data-base64:~assets/accordion.svg"



function dayDiv({ dayIndex, dOfW, dayTaskOrder, ...props }) {
  const [isOpenAry, setIsOpenAry] = props.grobalState.isOpenAryState
  const isOpen = isOpenAry[dayIndex]

  // その曜日の合計時間
  const totalTime = getTotalDayTime(dayTaskOrder, props.grobalState.allTaskState)

  const onClickDayTitle = () => {
    const newIsOpenAry = [...isOpenAry]
    newIsOpenAry[dayIndex] = !isOpenAry[dayIndex]
    setIsOpenAry(newIsOpenAry)
  }

  const onClickNewTask = (event) => {
    // 親コンポーネントへのイベントの伝搬を防ぐ
    event.stopPropagation()

    // 新規作成時はアコーディオンを開く
    const newIsOpenAry = [...isOpenAry]
    newIsOpenAry[dayIndex] = true
    setIsOpenAry(newIsOpenAry)

    createNewTask(props.grobalState.allTaskState, props.grobalState.orderDataState, dayIndex)
  }

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv" onClick={onClickDayTitle}>
        <img className={isOpen ? "accordionOpen" : "accordionClose"} src={accordionIcon} alt="開く" />
        <div className="dayTitile">{dOfW}</div>
        <div className="totalTime">{totalTime.toFixed(2)} h</div>
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
