import { useState, useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { ALL_TASK, ORDER, getDayTaskOrder } from "./common"
import Header from "./Header"
import DayDiv from "./DayDiv"
import "../css/common.css"
import "../css/index.css"

const DAY_OF_WEEK_ARY = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.",]

function IndexPopup() {
  const [allTask, setAllTask] = useStorage("taskData", ALL_TASK)
  const [orderData, setOrderData] = useStorage("orderData", ORDER)

  const [doingTaskId, setDoingTaskId] = useStorage("doingTaskId", "")
  const [startTime, setStartTime] = useStorage("startTime", 0)

  console.dir(allTask)
  // alert("a")
  useEffect(() => {
  }, [])


  return (
    <div className="page">
      <div className="container">
        <Header />
        {DAY_OF_WEEK_ARY.map((DAY_OF_WEEK, index) => {
          const dayTaskOrder = getDayTaskOrder(orderData, index)

          return <DayDiv
            key={DAY_OF_WEEK}
            dayIndex={index}
            dOfW={DAY_OF_WEEK}
            dayTaskOrder={dayTaskOrder}
            allTaskState={[allTask, setAllTask]}
            orderDataState={[orderData, setOrderData]}
            doingTaskState={[doingTaskId, setDoingTaskId]}
            startTimeState={[startTime, setStartTime]}
          />
        })}
      </div>
    </div>
  )
}

export default IndexPopup


