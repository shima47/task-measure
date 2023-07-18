import { useState } from "react"
import Header from "./Header"
import DayDiv from "./DayDiv"
import "../css/common.css"
import "../css/index.css"

const taskData = [
  [
    { id: "fgv08werg", title: "タスク", time: "00h 00m", },
    { id: "egv453634gv6v", title: "タスク", time: "00h 00m", },
  ],
  [
    { id: "34g53ybgb34", title: "タスク", time: "00h 00m", },
  ],
  [],
  [],
  [
    { id: "b45y4b", title: "タスク", time: "00h 00m", },
    { id: "v5y4567gv56", title: "タスク", time: "00h 00m", },
  ],
]

const orderData = [
  ["fgv08werg", "egv453634gv6v"],
  ["34g53ybgb34",],
  [],
  [],
  ["b45y4b", "v5y4567gv56"],
]

const dOfWAry = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."]

function IndexPopup() {
  const [doingTaskId, setDoingTaskId] = useState("")
  const [startTime, setStartTime] = useState("")

  return (
    <div className="page">
      <div className="container">
        <Header />
        {dOfWAry.map((dOfW, index) => {
          return <DayDiv
            dayTitle={dOfW}
            task={taskData[index]}
            doingTaskState={[doingTaskId, setDoingTaskId]}
          />
        })}
      </div>
    </div>
  )
}

export default IndexPopup
