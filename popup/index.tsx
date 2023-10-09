import { BrowserRouter, } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import MyProvider from "~components/Provider/MyProvider"
import Page from "~popup/Page"
import "~css/common.css"
import "~css/page.css"
import "~css/header.css"
import "~css/home.css"
import "~css/dayDiv.css"
import "~css/task.css"
import "~css/dataImport.css"
import "~css/setting.css"


ReactDOM.createRoot(document.getElementById('__plasmo')).render(
  <MyProvider >
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  </MyProvider>
)

