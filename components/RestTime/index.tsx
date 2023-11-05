import useRestTime from "~features/restTime/useSettingRestTime"

const RestTime = ({ restTimeIndex }) => {
  const [
    startRestTime,
    endRestTime,
    isSelect,
    {
      onChangeStartRestTime,
      onChangeEndRestTime,
      onChangeSelect
    }
  ] = useRestTime(restTimeIndex)


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