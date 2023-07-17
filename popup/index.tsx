import { useState } from "react"
import Header from "./Header"
import DayDiv from "./DayDiv"
import "../css/common.css"
import "../css/index.css"


function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="page">
      <div className="container">
        <Header />
        <DayDiv />
        <DayDiv />
        <DayDiv />
        <DayDiv />
        <DayDiv />
      </div>
    </div>
  )
}

export default IndexPopup
