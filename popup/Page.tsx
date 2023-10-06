import { Routes, Route } from 'react-router-dom';
import Header from "~components/Header";
import Home from "./Home";
import Setting from './Setting';


const Page = () => {
  return (
    <div className="page">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/popup.html" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
  )
}

export default Page

