

const Setting = () => {
  return (
    <div className="setting">
      <div className="settingItem">
        <div className="settingTitle">Rest Time</div>
        <div className="settingInput">
          <div className="restTime">
            <input className="checkbox" type="checkbox" checked />
            <input className="timeTypeInput" type="time" value={"11:45"}/>
            <div>～</div>
            <input className="timeTypeInput" type="time" value={"12:30"} />
          </div>
          <div className="restTime">
            <input className="checkbox" type="checkbox" checked />
            <input className="timeTypeInput" type="time" value={"11:30"} />
            <div>～</div>
            <input className="timeTypeInput" type="time" value={"12:15"} />
          </div>
          <div className="restTime">
            <input className="checkbox" type="checkbox" checked />
            <input className="timeTypeInput" type="time" value={"17:30"} />
            <div>～</div>
            <input className="timeTypeInput" type="time" value={"17:45"} />
          </div>
        </div>
      </div>
      <div className="btn">Save</div>
    </div>
  )
}

export default Setting

