import { useState, useEffect, useContext } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { getDayTaskOrder } from "./common"
import { INITIAL_DATA } from "~components/initialData"
import * as context from "~components/Provider/MyProvider";
import Header from "~components/Header";
import DayDiv from "./DayDiv"
import DataImport from "./DataImport"


const DAY_OF_WEEK_ARY = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.",]

const Page = () => {
  const [allTask, setAllTask] = useStorage("taskData", INITIAL_DATA.ALL_TASK)
  const [orderData, setOrderData] = useStorage("orderData", INITIAL_DATA.ORDER)

  const [runningTask, setRunningTask] = useContext(context.runningTaskContext)
  const [isOpenAry, setIsOpenAry] = useStorage("isOpen", INITIAL_DATA.IS_OPEN_ARY)

  const [selectedTaskId, setSelectedTaskId] = useState("")
  // JSONのインポート画面を切り替える
  const [isImporting, setIsImporting] = useContext(context.isImportingContext)

  console.dir(allTask)


  const grobalState = {
    allTaskState: [allTask, setAllTask],
    orderDataState: [orderData, setOrderData],
    isOpenAryState: [isOpenAry, setIsOpenAry],
    runningTask: [runningTask, setRunningTask],
    selectedTaskIdState: [selectedTaskId, setSelectedTaskId],
  }

  return (
    <div className="page">
      <Header grobalState={grobalState} />
      <div className="container">
        {
          isImporting ?
            <DataImport />
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

