import { useState } from "react"
import { updateTaskTime, getChangedOrder, deleteTask, deleteAllTask } from "./common"
import upArrowIcon from "data-base64:~assets/upArrow.svg"
import downArrowIcon from "data-base64:~assets/downArrow.svg"
import exportIcon from "data-base64:~assets/export.svg"
import deleteIcon from "data-base64:~assets/delete.svg"
import resetIcon from "data-base64:~assets/reset.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import "../css/header.css"


function Header(props) {
  // データ系
  const [allTask, setAllTask] = props.grobalState.allTaskState
  const [orderData, setOrderData] = props.grobalState.orderDataState
  const [startTime, setStartTime] = props.grobalState.doingTaskState
  const [doingTaskId, setDoingTaskId] = props.grobalState.startTimeState
  const [selectedTaskId, setSelectedTaskId] = props.grobalState.selectedTaskIdState
  const [isImporting, setIsImporting] = props.grobalState.isImportingState


  const onClickForward = () => {
    if (selectedTaskId === "") return
    const changedOrder = getChangedOrder(orderData, selectedTaskId)
    setOrderData(changedOrder)
  }

  const onClickBackward = () => {
    if (selectedTaskId === "") return
    const changedOrder = getChangedOrder(orderData, selectedTaskId, "backward")
    setOrderData(changedOrder)
  }

  const onClickImport = () => {
    setIsImporting(current => !current)
  }

  const onClickDelete = () => {
    // タスクが選択されていなければ全削除
    if (selectedTaskId === "") {
      deleteAllTask(props.grobalState)
    } else {
      deleteTask(props.grobalState)
    }
  }

  const onClickStop = () => {
    // 実行中だったタスクに時間を記録する
    const didTask = allTask[doingTaskId]
    const newTaskTime = ((parseFloat(didTask.time) * 3600000) + (Date.now() - startTime)) / 3600000
    updateTaskTime(props.grobalState.allTaskState, doingTaskId, newTaskTime)

    setStartTime(0)
    setDoingTaskId("")
  }


  return (
    <div className="header">
      <div className="headerTitle">Task Measure</div>
      <div className="headerBtns">
        <div className="btn" onClick={onClickBackward}>
          <img src={upArrowIcon} alt="上矢印" ></img>
        </div>
        <div className="btn" onClick={onClickForward}>
          <img src={downArrowIcon} alt="下矢印"></img>
        </div>
        <div className="btn" onClick={onClickDelete}>
          <img src={deleteIcon} alt="削除"></img>
        </div>
        <div className="btn">
          <img src={resetIcon} alt="リセット"></img>
        </div>
        <div className="btn" onClick={onClickImport}>
          <img src={exportIcon} alt="JSONエクスポート"></img>
        </div>
        <div className="btn" onClick={onClickStop}>
          <img src={stopIcon} alt="ストップ"></img>
        </div>
      </div>
    </div>
  )
}

export default Header
