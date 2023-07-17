import { useState } from "react"
import upArrowIcon from "data-base64:~assets/upArrow.svg"
import downArrowIcon from "data-base64:~assets/downArrow.svg"
import deleteIcon from "data-base64:~assets/delete.svg"
import resetIcon from "data-base64:~assets/reset.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import "../css/header.css"


function Header() {
  const [data, setData] = useState("")

  return (
    <div className="header">
      <div className="headerTitle">Task Measure</div>
      <div className="headerBtns">
        <div className="btn">
          <img src={upArrowIcon} alt="上矢印"></img>
        </div>
        <div className="btn">
          <img src={downArrowIcon} alt="下矢印"></img>
        </div>
        <div className="btn">
          <img src={deleteIcon} alt="削除"></img>
        </div>
        <div className="btn">
          <img src={resetIcon} alt="リセット"></img>
        </div>
        <div className="btn">
          <img src={stopIcon} alt="ストップ"></img>
        </div>
      </div>
    </div>
  )
}

export default Header
