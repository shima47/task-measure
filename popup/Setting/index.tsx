import { Tooltip } from "react-tooltip";
import useSetting from "~hooks/useSetting";
import RestTime from "~components/RestTime"
import addIcon from "data-base64:~assets/add.svg"


const Setting = () => {
  const [restTimeAry, { onClickAddRestTime }] = useSetting()

  return (
    <div className="setting">
      <div className="settingItem">
        <div className="settingLeft">
          <div className="settingTitle">Rest Time</div>
          <div className="btn" id="addBtn" onClick={onClickAddRestTime}>
            <img src={addIcon} alt="追加" />
            <Tooltip anchorSelect="#addBtn" content='追加' place='bottom' delayShow={800} />
          </div>
        </div>
        <div className="settingRight">
          {
            restTimeAry.map((item, index) => {
              return <RestTime key={item.id} restTimeIndex={index}></RestTime>
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

