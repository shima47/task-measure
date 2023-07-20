import { useState, useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import Header from "./Header"
import DayDiv from "./DayDiv"
import "../css/common.css"
import "../css/index.css"

const ALL_TASK = [
  [
    { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", title: "タスク", time: 11234567, },
    { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62", title: "タスク", time: 2334567, },
  ],
  [
    { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb61", title: "タスク", time: 3244567, },
  ],
  [],
  [],
  [
    { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb64", title: "タスク", time: 9235567, },
    { id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb63", title: "タスク", time: 4235567, },
  ],
]

const ORDER = [
  ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62"],
  ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb61",],
  [],
  [],
  ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb64", "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb63"],
]


function IndexPopup() {
  const [allTask, setAllTask] = useStorage("taskData", ALL_TASK)
  const [orderData, setOrderData] = useStorage("orderData", ORDER)

  const [doingTaskId, setDoingTaskId] = useStorage("doingTaskId", "")
  const [startTime, setStartTime] = useStorage("startTime", 0)

  useEffect(() => {
    // alert("a")
  }, [])


  return (
    <div className="page">
      <div className="container">
        <Header />
        {allTask.map((dayTask, index) => {
          return <DayDiv
            key={index}
            dayIndex={index}
            dayTask={dayTask}
            allTaskState={[allTask, setAllTask]}
            doingTaskState={[doingTaskId, setDoingTaskId]}
            startTimeState={[startTime, setStartTime]}
          />
        })}
      </div>
    </div>
  )
}

export default IndexPopup


