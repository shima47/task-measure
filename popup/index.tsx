import { useState } from "react"
import Header from "./Header"
import "../css/index.css"


function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="page">
      <div className="container">
        <Header></Header>
      </div>
    </div>
  )
}

export default IndexPopup
