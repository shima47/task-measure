import { useState, useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { ALL_TASK, ORDER, getDayTaskOrder } from "./common"
import Header from "./Header"
import DayDiv from "./DayDiv"
import DataImport from "./DataImport"
import "../css/common.css"
import "../css/index.css"
import { type } from "os"

const DAY_OF_WEEK_ARY = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.",]

const IndexPopup = () => {
  const [allTask, setAllTask] = useStorage("taskData", ALL_TASK)
  const [orderData, setOrderData] = useStorage("orderData", ORDER)

  const [doingTaskId, setDoingTaskId] = useStorage("doingTaskId", "")
  const [startTime, setStartTime] = useStorage("startTime", 0)
  const [isOpenAry, setIsOpenAry] = useStorage("isOpen", [true, true, true, true, true])

  const [selectedTaskId, setSelectedTaskId] = useState("")
  // JSONのインポート画面を切り替える
  const [isImporting, setIsImporting] = useState(false)

  console.dir(allTask)


  const grobalState = {
    allTaskState: [allTask, setAllTask],
    orderDataState: [orderData, setOrderData],
    doingTaskState: [doingTaskId, setDoingTaskId],
    startTimeState: [startTime, setStartTime],
    isOpenAryState: [isOpenAry, setIsOpenAry],
    selectedTaskIdState: [selectedTaskId, setSelectedTaskId],
    isImportingState: [isImporting, setIsImporting],
  }

  return (
    <div className="page">
      <Header grobalState={grobalState} />
      <div className="container">
        {
          isImporting ?
            <DataImport grobalState={grobalState} />
            :
            DAY_OF_WEEK_ARY.map((DAY_OF_WEEK, index) => {
              const dayTaskOrder = getDayTaskOrder(orderData, index)

              return <DayDiv
                key={DAY_OF_WEEK}
                dayIndex={index}
                dOfW={DAY_OF_WEEK}
                dayTaskOrder={dayTaskOrder}
                grobalState={grobalState}
              />
            })
        }
      </div>
    </div>
  )
}

export default IndexPopup


// type grobalState = {
//   allTaskState: [allTask, setAllTask],
//   orderDataState: [orderData, setOrderData],
//   doingTaskState: [doingTaskId, setDoingTaskId],
//   startTimeState: [startTime, setStartTime],
//   isOpenAryState: [isOpenAry, setIsOpenAry],
//   selectedTaskIdState: [selectedTaskId, setSelectedTaskId],
//   isImportingState: [isImporting, setIsImporting],
// }