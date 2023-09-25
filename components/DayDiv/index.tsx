import { useContext, } from "react"
import * as context from "~components/Provider/MyProvider";
import Task from "~components/Task"
import useDaytaskOrder from "~hooks/useDayTaskOrder";
import useNewTask from "~features/createNewTask/useNewTask";
import useFoldingUp from "~features/foldingUp/useFoldingUp";
import useDayTotalTime from "~features/totalDayTime/useTotalDayTime";
import addIcon from "data-base64:~assets/add.svg"
import accordionIcon from "data-base64:~assets/accordion.svg"


const DayDiv = ({ dayIndex, dOfW, }) => {
  const dayTaskOrder = useDaytaskOrder(dayIndex)
  const [isOpen, { onClickDayTitle }] = useFoldingUp(dayIndex)
  // その曜日の合計時間
  const totalTime = useDayTotalTime(dayIndex)

  const { onClickCreateTask } = useNewTask(dayIndex)


  return (
    <div className="dayDiv">
      <div className="dayTitleDiv" onClick={onClickDayTitle}>
        <img className={isOpen ? "accordionOpen" : "accordionClose"} src={accordionIcon} alt="開く" />
        <div className="dayTitile">{dOfW}</div>
        <div className="totalTime">{totalTime.toFixed(2)} h</div>
        <div className="btn" onClick={onClickCreateTask}>
          <img src={addIcon} alt="新規追加" />
        </div>
      </div>
      <div className="taskDiv">
        {
          isOpen ?
            dayTaskOrder.map(taskId => {
              return <Task key={taskId} taskId={taskId} />
            })
            :
            <></>
        }
      </div>
    </div>
  )
}

export default DayDiv
