import { useContext, } from "react"
import { getTotalDayTime } from "../../popup/common"
import * as context from "~components/Provider/MyProvider";
import Task from "~components/Task"
import addIcon from "data-base64:~assets/add.svg"
import accordionIcon from "data-base64:~assets/accordion.svg"
import useNewTask from "~features/createNewTask/useNewTask";


function dayDiv({ dayIndex, dOfW, dayTaskOrder, ...props }) {
  const [isOpenAry, setIsOpenAry] = useContext(context.isOpenAryContext)
  const isOpen = isOpenAry[dayIndex]
  const { onClickCreateTask } = useNewTask(dayIndex)

  // その曜日の合計時間
  const totalTime = getTotalDayTime(dayTaskOrder, props.grobalState.allTaskState)

  const onClickDayTitle = () => {
    const newIsOpenAry = [...isOpenAry]
    newIsOpenAry[dayIndex] = !isOpenAry[dayIndex]
    setIsOpenAry(newIsOpenAry)
  }


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
            dayTaskOrder.map((taskId, index) => {
              return <Task key={taskId} taskId={taskId} />
            })
            :
            <></>
        }
      </div>
    </div>
  )
}

export default dayDiv
