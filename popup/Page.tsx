import { useState, useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { getDayTaskOrder } from "./common"
import { INITIAL_DATA } from "~components/Provider/initialData"
import Header from "./Header"
import DayDiv from "./DayDiv"
import DataImport from "./DataImport"

const DAY_OF_WEEK_ARY = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.",]

const Page = () => {
  const [allTask, setAllTask] = useStorage("taskData", INITIAL_DATA.ALL_TASK)
  const [orderData, setOrderData] = useStorage("orderData", INITIAL_DATA.ORDER)

  const [doingTaskId, setDoingTaskId] = useStorage("doingTaskId", "")
  const [startTime, setStartTime] = useStorage("startTime", 0)
  const [isOpenAry, setIsOpenAry] = useStorage("isOpen", INITIAL_DATA.IS_OPEN_ARY)

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

export default Page

