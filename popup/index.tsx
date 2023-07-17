import { useState } from "react"
import Header from "./Header"
import DayDiv from "./DayDiv"
import "../css/common.css"
import "../css/index.css"

const taskData = [
  { id: "fgv08werg", title: "タスク", time: "00h 00m", dOfW: "Mon", },
  { id: "egv453634gv6v", title: "タスク", time: "00h 00m", dOfW: "Mon", },
  { id: "34g53ybgb34", title: "タスク", time: "00h 00m", dOfW: "Tue", },
  { id: "b45y4b", title: "タスク", time: "00h 00m", dOfW: "Fri", },
  { id: "v5y4567gv56", title: "タスク", time: "00h 00m", dOfW: "Fri", },
]

const orderData = [
  ["fgv08werg", "egv453634gv6v"],
  ["34g53ybgb34",],
  [],
  [],
  ["b45y4b", "v5y4567gv56"],
]


function IndexPopup() {
  const [doingTaskId, setDoingTaskId] = useState("")

  return (
    <div className="page">
      <div className="container">
        <Header />
        <DayDiv dayTitle={"Mon."} />
        <DayDiv dayTitle={"Tue."} />
        <DayDiv dayTitle={"Wed."} />
        <DayDiv dayTitle={"Thu."} />
        <DayDiv dayTitle={"Fri."} />
      </div>
    </div>
  )
}

export default IndexPopup
