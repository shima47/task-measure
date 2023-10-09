import useSettingRestTime from "~features/restTime/useSettingRestTime"

const RestTime = () => {
  const [
    startRestTime,
    endRestTime,
    isSelect,
    {
      onChangeStartRestTime,
      onChangeEndRestTime,
      onChangeSelect
    }
  ] = useSettingRestTime(0)


  return (
    <div className="restTime">
      <input className="checkbox" type="checkbox" checked={isSelect} onChange={onChangeSelect} />
      <input className="timeTypeInput" type="time" value={startRestTime} onChange={onChangeStartRestTime} />
      <div>～</div>
      <input className="timeTypeInput" type="time" value={endRestTime} onChange={onChangeEndRestTime} />
    </div>
  )
}

export default RestTime