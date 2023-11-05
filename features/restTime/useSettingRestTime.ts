import { useEffect, useState } from "react"
import * as type from "~types/type"
import { getRestTime, updateRestTime, } from "~features/restTime/storage";


const useSettingRestTime = (restTimeIndex: number) => {
  const [startRestTime, setStartRestTime] = useState("")
  const [endRestTime, setEndRestTime] = useState("")
  const [isSelect, setIsSelect] = useState(false)

  useEffect(() => { effectFn() }, [])

  const effectFn = async () => {
    const restTimeAry = await getRestTime()
    const restTime = restTimeAry[restTimeIndex]
    setStartRestTime(restTime.start)
    setEndRestTime(restTime.end)
    setIsSelect(restTime.isSelect)
  }

  const onChangeSelect = async () => {
    // ローカルストレージに保存
    updateRestTimeValue(restTimeIndex, "isSelect", !isSelect)
    // state更新
    setIsSelect(current => !current)
  }

  const onChangeStartRestTime = async (e) => {
    const startRestTime = e.target.value
    // ローカルストレージに保存
    updateRestTimeValue(restTimeIndex, "start", startRestTime)
    // state更新
    setStartRestTime(startRestTime)
  }

  const onChangeEndRestTime = async (e) => {
    const endRestTime = e.target.value
    // ローカルストレージに保存
    updateRestTimeValue(restTimeIndex, "end", endRestTime)
    // state更新
    setEndRestTime(endRestTime)
  }

  return [startRestTime, endRestTime, isSelect, { onChangeStartRestTime, onChangeEndRestTime, onChangeSelect }] as const
}

const updateRestTimeValue = async (restTimeIndex: number, key: type.restTimeKeys, value: type.restTimeValues) => {
  // ローカルストレージから取得
  const restTimeAry = await getRestTime()
  // データを更新
  const newRestTime: type.restTime = { ...restTimeAry.at(restTimeIndex), [key]: value }
  const newRestTimeAry = restTimeAry.with(restTimeIndex, newRestTime)
  await updateRestTime(newRestTimeAry)
}

export default useSettingRestTime
