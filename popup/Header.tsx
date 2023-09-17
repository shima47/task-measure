import { useContext, useState } from "react"
import { updateTaskTime, getChangedOrder, deleteTask, deleteAllTask } from "./common"
import upArrowIcon from "data-base64:~assets/upArrow.svg"
import downArrowIcon from "data-base64:~assets/downArrow.svg"
import exportIcon from "data-base64:~assets/export.svg"
import deleteIcon from "data-base64:~assets/delete.svg"
import forwardIcon from "data-base64:~assets/forward.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import rewindTimeIcon from "data-base64:~assets/rewindTime.svg"
import { isImportingContext } from "~components/Provider/MyProvider"


function Header(props) {
  // データ系
  const [allTask, setAllTask] = props.grobalState.allTaskState
  const [orderData, setOrderData] = props.grobalState.orderDataState
  const [startTime, setStartTime] = props.grobalState.doingTaskState
  const [doingTaskId, setDoingTaskId] = props.grobalState.startTimeState
  const [selectedTaskId, setSelectedTaskId] = props.grobalState.selectedTaskIdState
  const [isImporting, setIsImporting] = useContext(isImportingContext)


  const onClickUpArrow = () => {
    if (selectedTaskId === "") return
    const changedOrder = getChangedOrder(orderData, selectedTaskId)
    setOrderData(changedOrder)
  }

  const onClickDownArrow = () => {
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

  const onClickRewind = () => {
    if (selectedTaskId === "") return

    const timeToRewind = 0.25
    // 実行中だったタスクに時間を記録する
    const didTask = allTask[selectedTaskId]
    const newTaskTime = (parseFloat(didTask.time) - timeToRewind)
    updateTaskTime(props.grobalState.allTaskState, selectedTaskId, newTaskTime)
  }

  const onClickForward = () => {
    if (selectedTaskId === "") return

    const timeToForward = 0.25
    // 実行中だったタスクに時間を記録する
    const didTask = allTask[selectedTaskId]
    const newTaskTime = (parseFloat(didTask.time) + timeToForward)
    updateTaskTime(props.grobalState.allTaskState, selectedTaskId, newTaskTime)
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
        <div className="btn" onClick={onClickDownArrow}>
          <img src={upArrowIcon} alt="上矢印" ></img>
        </div>
        <div className="btn" onClick={onClickUpArrow}>
          <img src={downArrowIcon} alt="下矢印"></img>
        </div>
        <div className="btn" onClick={onClickDelete}>
          <img src={deleteIcon} alt="削除"></img>
        </div>
        <div className="btn" onClick={onClickImport}>
          <img src={exportIcon} alt="JSONエクスポート"></img>
        </div>
        <div className="btn" onClick={onClickRewind}>
          <img src={rewindTimeIcon} alt="巻き戻し"></img>
        </div>
        <div className="btn" onClick={onClickForward}>
          <img src={forwardIcon} alt="早送り"></img>
        </div>
        <div className="btn" onClick={onClickStop}>
          <img src={stopIcon} alt="ストップ"></img>
        </div>
      </div>
    </div>
  )
}

export default Header
