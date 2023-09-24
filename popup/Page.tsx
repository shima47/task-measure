import { useState, useEffect, useContext } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { getDayTaskOrder } from "./common"
import { INITIAL_DATA } from "~components/initialData"
import * as context from "~components/Provider/MyProvider";
import Header from "~components/Header";
import DayDiv from "../components/DayDiv"
import DataImport from "./importData"


const DAY_OF_WEEK_ARY = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.",]

const Page = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [order, setOrder] = useContext(context.orderContext)

  const [runningTask, setRunningTask] = useContext(context.runningTaskInfoContext)
  const [isOpenAry, setIsOpenAry] = useContext(context.isOpenAryContext)

  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)
  // JSONのインポート画面を切り替える
  const [isImporting, setIsImporting] = useContext(context.isImportingContext)

  console.dir(allTask)


  const grobalState = {
    allTaskState: [allTask, setAllTask],
    orderDataState: [order, setOrder],
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
              const dayTaskOrder = getDayTaskOrder(order, index)

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

