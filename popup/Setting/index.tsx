import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { getRestTime } from "~features/restTime/storage";
import RestTime from "~components/RestTime"
import addIcon from "data-base64:~assets/add.svg"


const Setting = () => {
  const [restTimeAry, setRestTimeAry] = useState([])

  useEffect(() => { effectFn() }, [])
  
  const effectFn = async () => {
    const restTimeAry = await getRestTime()
    setRestTimeAry(restTimeAry)
  }

  return (
    <div className="setting">
      <div className="settingItem">
        <div className="settingLeft">
          <div className="settingTitle">Rest Time</div>
          <div className="btn" id="addBtn" onClick={() => { }}>
            <img src={addIcon} alt="追加" />
            <Tooltip anchorSelect="#addBtn" content='追加' place='bottom' delayShow={700} />
          </div>
        </div>
        <div className="settingRight">
          {
            restTimeAry.map((item, index) => {
              return <RestTime restTimeIndex={index}></RestTime>
            })
          }
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Setting

