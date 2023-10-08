import RestTime from "~components/RestTime"


const Setting = () => {
  return (
    <div className="setting">
      <div className="settingItem">
        <div className="settingTitle">Rest Time</div>
        <div className="settingInput">
          <RestTime></RestTime>
          <RestTime></RestTime>
          <RestTime></RestTime>
        </div>
      </div>
      <div className="btn">Save</div>
    </div>
  )
}

export default Setting

