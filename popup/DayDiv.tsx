import { useState } from "react"
import addIcon from "data-base64:~assets/add.svg"
import "../css/dayDiv.css"


function dayDiv() {
  const [data, setData] = useState("")

  return (
    <div className="dayDiv">
      <div className="dayTitleDiv">
        <div className="dayTitile">Mon.</div>
        <div className="btn">
          <img src={addIcon} alt="新規追加"></img>
        </div>
      </div>
      <div className="dayLine"></div>
      <div className="taskDiv">

      </div>
    </div>
  )
}

export default dayDiv
