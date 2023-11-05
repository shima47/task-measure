import { Tooltip } from 'react-tooltip'
import useRestTime from "~features/restTime/useRestTime"
import deleteIcon from "data-base64:~assets/delete.svg"

const RestTime = ({ restTimeIndex }) => {
  const [restTime, { onChangeStartRestTime, onChangeEndRestTime, onChangeSelect }] = useRestTime(restTimeIndex)


  return (
    <div className="restTime">
      <input className="checkbox" type="checkbox" checked={restTime.isSelect} onChange={onChangeSelect} />
      <input className="timeTypeInput" type="time" value={restTime.start} onChange={onChangeStartRestTime} />
      <div>～</div>
      <input className="timeTypeInput" type="time" value={restTime.end} onChange={onChangeEndRestTime} />
      <div className="restTimeDeleteBtn" id="deleteBtn" onClick={()=>{}}>
          <img src={deleteIcon} alt="削除"></img>
          <Tooltip anchorSelect="#deleteBtn" content='削除' place='bottom' delayShow={700} />
        </div>
    </div>
  )
}

export default RestTime