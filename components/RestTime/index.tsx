import { useState } from "react"

const RestTime = () => {
  const [startRestTime, setStartRestTime] = useState("")
  const [endRestTime, setEndRestTime] = useState("")
  const [isSelect, setIsSelect] = useState(false)

  const onChangeSelect = () => {
    setIsSelect(current => !current)
  }

  const onChangeStartRestTime = (e) => {
    setStartRestTime(e.target.value)
  }

  const onChangeEndRestTime = (e) => {
    setEndRestTime(e.target.value)
  }

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