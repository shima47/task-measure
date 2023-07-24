import { useState } from "react"
import { updateTaskTime } from "./common"
import upArrowIcon from "data-base64:~assets/upArrow.svg"
import downArrowIcon from "data-base64:~assets/downArrow.svg"
import deleteIcon from "data-base64:~assets/delete.svg"
import resetIcon from "data-base64:~assets/reset.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import "../css/header.css"


function Header(props) {
  // データ系
  const [allTask, setAllTask] = props.storageProps.allTaskState
  const [orderData, setOrderData] = props.storageProps.orderDataState
  const [startTime, setStartTime] = props.storageProps.doingTaskState
  const [doingTaskId, setDoingTaskId] = props.storageProps.startTimeState

  const onClickDelete = () => {
    allDelete()
  }

  const allDelete = () => {
    if (confirm("タスクを全て削除しますか？")) {
      setAllTask({})
      setOrderData([0, 1, 2, 3, 4, 5])
      setStartTime(0)
      setDoingTaskId("")
    }
  }

  const onClickStop = () => {
    // 実行中だったタスクに時間を記録する
    updateTaskTime(props.storageProps.allTaskState, doingTaskId, startTime)

    setStartTime(0)
    setDoingTaskId("")
  }



  return (
    <div className="header">
      <div className="headerTitle">Task Measure</div>
      <div className="headerBtns">
        <div className="btn">
          <img src={upArrowIcon} alt="上矢印"></img>
        </div>
        <div className="btn">
          <img src={downArrowIcon} alt="下矢印"></img>
        </div>
        <div className="btn" onClick={onClickDelete}>
          <img src={deleteIcon} alt="削除"></img>
        </div>
        <div className="btn">
          <img src={resetIcon} alt="リセット"></img>
        </div>
        <div className="btn" onClick={onClickStop}>
          <img src={stopIcon} alt="ストップ"></img>
        </div>
      </div>
    </div>
  )
}

export default Header
