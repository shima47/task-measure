import useRestTime from "~features/restTime/useRestTime"

const RestTime = ({ restTimeIndex }) => {
  const [restTime, { onChangeStartRestTime, onChangeEndRestTime, onChangeSelect }] = useRestTime(restTimeIndex)


  return (
    <div className="restTime">
      <input className="checkbox" type="checkbox" checked={restTime.isSelect} onChange={onChangeSelect} />
      <input className="timeTypeInput" type="time" value={restTime.start} onChange={onChangeStartRestTime} />
      <div>～</div>
      <input className="timeTypeInput" type="time" value={restTime.end} onChange={onChangeEndRestTime} />
    </div>
  )
}

export default RestTime