import { useState, useEffect } from "react"
import Header from "./Header"
import DayDiv from "./DayDiv"
import { formatElapsedTime } from "./common"
import "../css/common.css"
import "../css/index.css"

const taskData = [
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

const orderData = [
  ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62"],
  ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb61",],
  [],
  [],
  ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb64", "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb63"],
]

const dOfWAry = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."]


function IndexPopup() {
  const [doingTaskId, setDoingTaskId] = useState("")
  const [startTime, setStartTime] = useState("")

  useEffect(() => {
    // alert("a")
  }, [])



  return (
    <div className="page">
      <div className="container">
        <Header />
        {dOfWAry.map((dOfW, index) => {
          return <DayDiv
            dayTitle={dOfW}
            taskAry={taskData[index]}
            doingTaskState={[doingTaskId, setDoingTaskId]}
            startTimeState={[startTime, setStartTime]}
          />
        })}
      </div>
    </div>
  )
}

export default IndexPopup


