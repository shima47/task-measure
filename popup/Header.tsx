import { useState } from "react"
import "../css/header.css"


function Header() {
  const [data, setData] = useState("")

  return (
    <div className="header">
      <div className="headerTitle">Task Measure</div>
      <div className="headerBtns">
        <div className="btn">
          <img src="../assets/upArrow.svg"></img>
        </div>
        <div className="btn"></div>
        <div className="btn"></div>
        <div className="btn"></div>
        <div className="btn"></div>
      </div>
    </div>
  )
}

export default Header
