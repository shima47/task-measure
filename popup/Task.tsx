import { useEffect, useState } from "react"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import { formatElapsedTime, updateTaskTitle } from "./common"
import "../css/task.css"

/**
 * タスク名のInputについて
 * Inputの内容をUseStorageに依存すると、日本語入力が上手くいかない
 * ex: テスト ->ｔｔてｔｔてｓｔｔてｔｔてｓす みたいになる
 * そこで日本語入力の間だけUseStateを利用して、入力終了時にUseStorageに切り替える運用にしている
 */

function Task(props) {
  // データ系
  const [allTask, setAllTask] = props.allTaskState
  const task = allTask[props.taskId]
  console.dir(task)
  const [orderData, setOrderData] = props.orderDataState
  // 全体のState
  const [startTime, setStartTime] = props.startTimeState
  const [doingTaskId, setDoingTaskId] = props.doingTaskState
  // ローカルのState
  const [composing, setComposition] = useState(false);
  const [composingTitle, setComposingTitle] = useState(task.title)

  const doTask = doingTaskId === props.taskId //実行中のタスクかどうか

  let formatedTaskTime
  if (doTask) {
    const newTaskTime = task.time + (Date.now() - startTime)
    formatedTaskTime = formatElapsedTime(newTaskTime)
  } else {
    formatedTaskTime = formatElapsedTime(task.time)
  }

  const onChangeTitle = (event) => {
    // 日本語入力の間はストレージに保存しない
    if (composing) {
      setComposingTitle(event.target.value)
    } else {
      updateTaskTitle(props.allTaskState, props.taskId, event.target.value)
    }
  }

  // 日本語入力開始時
  const startComposition = () => {
    setComposingTitle(task.title) //現在のタイトルをもらう
    setComposition(true);
  }
  // 日本語入力完了時
  const endComposition = () => {
    setComposition(false);
    updateTaskTitle(props.allTaskState, props.taskId, composingTitle) //ストレージに保存する
  }

  const stopTask = () => {
    const newTaskTime = task.time + (Date.now() - startTime)
    const updatedTask = { ...task, time: newTaskTime, }

    updateTaskTitle(props.allTaskState, doingTaskId, updatedTask)

    setStartTime(0)
    setDoingTaskId("")
  }

  const startTask = async () => {
    setStartTime(Date.now())
    setDoingTaskId(props.taskId)
  }


  return (
    <div className="task">
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
