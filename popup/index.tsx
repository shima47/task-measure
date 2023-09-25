import MyProvider from "../components/Provider/MyProvider"
import Page from "./Page"
import "../css/common.css"
import "../css/index.css"
import "../css/header.css"
import "../css/home.css"
import "../css/dayDiv.css"
import "../css/task.css"
import "../css/dataImport.css"

const IndexPopup = () => {

  return (
    <MyProvider >
      <Page />
    </MyProvider>
  )
}

export default IndexPopup

