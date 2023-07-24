import { useEffect, useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import { millisecondsToHours, updateTaskTitle, updateTaskTime } from "./common"
import "../css/task.css"

/**
 * タスク名のInputについて
 * Inputの内容をUseStorageに依存すると、日本語入力が上手くいかない
 * ex: テスト ->ｔｔてｔｔてｓｔｔてｔｔてｓす みたいになる
 * そこで日本語入力の間だけUseStateを利用して、入力終了時にUseStorageに切り替える運用にしている
 */

function Task(props) {
  // データ系
  const [allTask, setAllTask] = props.grobalState.allTaskState
  const [orderData, setOrderData] = props.grobalState.orderDataState
  const [startTime, setStartTime] = props.grobalState.doingTaskState
  const [doingTaskId, setDoingTaskId] = props.grobalState.startTimeState
  const [selectedTaskId, setSelectedTaskId] = props.grobalState.selectedTaskIdState

  const task = allTask[props.taskId]
  console.dir(task)
  // ローカルのState
  const [composing, setComposition] = useState(false);
  const [composingTitle, setComposingTitle] = useState(task.title)

  const doTask = doingTaskId === props.taskId //実行中のタスクかどうか
  const selected = selectedTaskId === props.taskId //実行中のタスクかどうか

  let formatedTaskTime
  if (doTask) {
    const newTaskTime = task.time + (Date.now() - startTime)
    console.dir(task.time)
    console.dir(Date.now())
    console.dir(startTime)
    formatedTaskTime = millisecondsToHours(newTaskTime)
  } else {
    formatedTaskTime = millisecondsToHours(task.time)
  }

  const onChangeTitle = (event) => {
    // 日本語入力の間はストレージに保存しない
    if (composing) {
      setComposingTitle(event.target.value)
    } else {
      updateTaskTitle(props.grobalState.allTaskState, props.taskId, event.target.value)
    }
  }

  // 日本語入力開始時
  const startComposition = () => {
    setComposingTitle(task.title) //現在のタイトルをもらう
    setComposition(true);
  }
  // 日本語入力完了時
  const endComposition = () => {
    updateTaskTitle(props.grobalState.allTaskState, props.taskId, composingTitle) //ストレージに保存する
    setComposition(false);
  }

  const startTask = async () => {
    // 前に実行中だったタスクに時間を記録する
    updateTaskTime(props.grobalState.allTaskState, doingTaskId, startTime)

    setStartTime(Date.now())
    setDoingTaskId(props.taskId)
  }

  const stopTask = () => {
    // 実行中だったタスクに時間を記録する
    updateTaskTime(props.grobalState.allTaskState, doingTaskId, startTime)

    setStartTime(0)
    setDoingTaskId("")
  }

  const onClickSelect = () => {
    // すでに選択済みなら選択を外す
    if (selected) {
      setSelectedTaskId("")
    } else {
      setSelectedTaskId(props.taskId)
    }
  }


  return (
    <div className={`task ${selected && "selectedTask"}`}>
      <input type="checkbox" checked={selected} onClick={onClickSelect} />
      <div className="taskTitle">
        <input
          className="taskForm"
          type="text"
          value={composing ? composingTitle : task.title} //日本語入力の間はローカルのUseStateに切り替える
          onCompositionStart={startComposition}
          onCompositionEnd={endComposition}
          onChange={onChangeTitle} />
      </div>
      <div className="taskTime">{formatedTaskTime}</div>
      {
        doTask ?
          <div className="btn" onClick={stopTask}>
            <img src={stopIcon} alt="ストップ" />
          </div>
          :
          <div className="btn" onClick={startTask}>
            <img src={startIcon} alt="スタート" />
          </div>
      }
    </div>
  )
}

export default Task
