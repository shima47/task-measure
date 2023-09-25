import useRunTask from "~features/runTask/useRunTask"
import useTaskTitle from "~hooks/useTaskTitle"
import useSelectTask from "~hooks/useSelectTask"
import useTask from "~hooks/useTask"
import useIsRunning from "~hooks/useIsRunning"
import useTaskTime from "~hooks/useTaskTime"
import useEffectTime from "~hooks/useEffectTime"
import startIcon from "data-base64:~assets/start.svg"
import stopIcon from "data-base64:~assets/stop.svg"


/**
 * タスク名のInputについて
 * Inputの内容をUseStorageに依存すると、日本語入力が上手くいかない
 */
const Task = ({ taskId }) => {
  const task = useTask(taskId)
  if (!task) return null // taskが削除されたらnullを返す
  // Formの状態
  const [taskTitle, onChangeTitle] = useTaskTitle(taskId)
  const [taskTime, { onFocusTaskTime, onChangeTaskTime, onBlurTaskTime }] = useTaskTime(taskId)
  // 実行状態
  const isRunning = useIsRunning(taskId)
  const { onClickStart, onClickStop, } = useRunTask(taskId)
  // 選択状態
  const [isSelected, onChangeSelect] = useSelectTask(taskId)

  // 経過時間を反映させる
  useEffectTime(taskId)

  return (
    <div className={`task ${isSelected && "selectedTask"}`} >
      <input
        className="taskCheckbox"
        type="checkbox"
        checked={isSelected}
        onChange={onChangeSelect}
      />
      <div className="taskTitle">
        <input
          className="taskForm"
          type="text"
          value={taskTitle}
          onChange={onChangeTitle} />
      </div>
      <div className="taskTime">
        <input
          className="taskTimeForm"
          type="text"
          value={taskTime}
          onChange={onChangeTaskTime}
          onFocus={onFocusTaskTime}
          onBlur={onBlurTaskTime}
        />
        h
      </div>
      {
        isRunning ?
          <div className="btn" onClick={onClickStop}>
            <img src={stopIcon} alt="ストップ" />
          </div>
          :
          <div className="btn" onClick={onClickStart}>
            <img src={startIcon} alt="スタート" />
          </div>
      }
    </div >
  )
}

export default Task
